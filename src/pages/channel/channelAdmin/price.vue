<template>
  <div>
    <div class="channel-list-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="请输入申请单号" />
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="listQuery.name" placeholder="请输入客户名称" />
          </a-form-model-item>
          <a-form-model-item>
            <a-range-picker
              :show-time="{
                hideDisabledOptions: true,
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'),
                  moment('11:59:59', 'HH:mm:ss')
                ]
              }"
              format="YYYY-MM-DD HH:mm:ss"
              :placeholder="['创建开始时间', '创建结束时间']"
              @change="datePickerOnOk"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-select
              style="width: 120px"
              allowClear
              v-model="listQuery.key"
              placeholder="请选择状态"
            >
              <a-select-option
                v-for="item in columns.slice(0, columns.length - 3)"
                :key="item.dataIndex"
                :value="item.dataIndex"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item>
            <a-button type="primary" @click="search"> 查询 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="public-table-wrap">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="orderNo" style="color: #00aaff" slot-scope="text">
            {{ text }}
          </span>
          <span slot="discountAmount" style="color: #ff6600" slot-scope="text">
            {{ text }}
          </span>

          <span slot="tradeStatus" style="color: #ff6600" slot-scope="text">
            {{ text }}
          </span>
          <span slot="name" style="color: #ff6600" slot-scope="text">
            {{ text }}
          </span>
          <span slot="account" style="color: #ff6600" slot-scope="text">
            {{ text }}
          </span>
          <span slot="accountName" style="color: #ff6600" slot-scope="text">
            {{ text }}
          </span>
          <div slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
          <div slot="tradeType" slot-scope="text">
            {{ text }}
          </div>
          <span slot="message" slot-scope="text">
            {{ text }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="goDetail(record, 'detail')">
              详情
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link"> 接收 </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="goDetail(record, 'confirm')">
              确认
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="goDetail(record, 'refuse')">
              驳回
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 提现管理操作弹框 -->
    <applyOption
      v-model="visibleDetail"
      :detailData="detailData"
      :title="title"
      :type="2"
    />
  </div>
</template>

<script>
import moment from "moment";
import applyOption from "@/components/withdraw/applyOption.vue";
export default {
  components: { applyOption },
  data() {
    return {
      moment,
      title: "",
      visibleDetail: false, //是否显示申请详情的弹框
      detailData: {}, //详情信息
      listQuery: {
        key: undefined,
        search: "",
        name: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "申请单号",
          dataIndex: "orderNo",
          scopedSlots: { customRender: "orderNo" }
        },
        {
          title: "状态",
          dataIndex: "tradeStatus",
          width: 100,
          scopedSlots: { customRender: "tradeStatus" }
        },
        {
          title: "客户名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "提现金额",
          dataIndex: "discountAmount",
          scopedSlots: { customRender: "discountAmount" }
        },
        {
          title: "收款账号",
          dataIndex: "account",
          scopedSlots: { customRender: "account" }
        },
        {
          title: "收款人",
          dataIndex: "accountName",
          scopedSlots: { customRender: "accountName" }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
          sorter: (a, b) => moment(a.createTime) - moment(b.createTime)
        },
        {
          title: "反馈时间",
          dataIndex: "modifyTime",
          scopedSlots: { customRender: "modifyTime" },
         sorter: (a, b) => moment(a.modifyTime) - moment(b.modifyTime)
        },
        {
          title: "备注",
          dataIndex: "tradeType",
          scopedSlots: { customRender: "tradeType" }
        },
        {
          title: "反馈信息",
          dataIndex: "message",
          scopedSlots: { customRender: "message" }
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      //   this.tableLoading = true;
      this.$getListQp("product/getProductDiscountList", this.listQuery).then(
        res => {
          this.tableLoading = false;
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        }
      );
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 查看
    goDetail(record, status) {
      console.log(status);
    //   1 : 提现申请详情 , 2:驳回提现申请 , 3:确认提现申请
      if (status == "detail") {
        this.title =1;
      } else if (status == "refuse") {
        this.title = 2;
      } else if (status == "confirm") {
        this.title = 3;
      }
      this.detailData = {};
      this.visibleDetail = true;
    },
    // 日期选择
    datePickerOnOk(value) {
      if (value.length !== 0) {
        this.listQuery.startTime = moment(value[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.listQuery.endTime = moment(value[1]).format("YYYY-MM-DD HH:mm:ss");
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
    },
    cancelOrder(record) {
      this.$confirm({
        title: "确认要取消申请吗？",
        onOk: () => {
          console.log("点击了取消");
          // this.$store
          //   .dispatch("income/cancelOrder", { id: record.id })
          //   .then((res) => {
          //     this.$message.success("取消成功");
          //     this.getList();
          //   });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-container {
  background: #fff;
  padding: 24px;
  .public-table-wrap {
    .status {
      display: flex;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: green;
        margin-right: 5px;
      }
      .dot-err {
        background: red;
      }
    }
  }
}
</style>
