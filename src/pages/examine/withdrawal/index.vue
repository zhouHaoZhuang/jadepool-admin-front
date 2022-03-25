<template>
  <div>
    <div class="channel-list-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-input
              v-model="listQuery['qp-orderNo-eq']"
              placeholder="请输入申请单号"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-input
              v-model="listQuery['qp-customerName-eq']"
              placeholder="请输入客户名称"
            />
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
              v-model="listQuery['qp-status-eq']"
              placeholder="请选择状态"
            >
              <a-select-option
                v-for="(item, keyIndex) in applyMenStatus"
                :key="item"
                :value="keyIndex"
              >
                {{ item }}
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
          :scroll="{ x: 1300 }"
          :pagination="paginationProps"
        >
          <span slot="orderNo" style="color: #00aaff" slot-scope="text">
            {{ text }}
          </span>

          <span slot="status" style="color: #ff6600" slot-scope="text">
            <a-tag
              :color="
                text == 1
                  ? '#87d068'
                  : text == 2
                  ? '#2db7f5'
                  : text == 3
                  ? 'red'
                  : text == 4
                  ? 'orange'
                  : text == 5
                  ? 'blue'
                  : 'gray'
              "
              >{{ applyMenStatus[text] }}</a-tag
            >
          </span>
          <div slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
          <span slot="action" slot-scope="text, record">
            <a-space>
              <a-button type="link" @click="goDetail(record, 'detail')">
                详情
              </a-button>
              <a-button
                type="link"
                v-if="record.status == 2"
                @click="receive(record)"
              >
                接收
              </a-button>
              <a-button
                type="link"
                @click="goDetail(record, 'confirm')"
                v-if="record.status == 5"
              >
                确认
              </a-button>
              <a-button
                type="link"
                @click="goDetail(record, 'refuse')"
                v-if="record.status == 5 || record.status == 2"
              >
                驳回
              </a-button>
            </a-space>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 提现管理操作弹框 -->
    <applyOption
      v-model="visibleDetail"
      :detailInfo="detailInfo"
      :title="title"
      :type="2"
      @success="getList"
    />
  </div>
</template>

<script>
import moment from "moment";
import applyOption from "@/components/withdraw/applyOption.vue";
import { applyMenStatus } from "@/utils/enum";
export default {
  components: { applyOption },
  data() {
    return {
      applyMenStatus,
      moment,
      title: "",
      visibleDetail: false, //是否显示申请详情的弹框
      detailInfo: {}, //详情信息
      listQuery: {
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
          dataIndex: "status",
          width: 120,
          scopedSlots: { customRender: "status" }
        },
        {
          title: "客户名称",
          width: 170,
          dataIndex: "customerName"
        },
        {
          title: "提现金额",
          width: 100,
          dataIndex: "dealAmount",
          scopedSlots: { customRender: "dealAmount" }
        },
        {
          title: "收款账号",
          width: 100,
          dataIndex: "accountNo",
          scopedSlots: { customRender: "accountNo" }
        },
        {
          title: "收款人",
          dataIndex: "accountName"
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" },
          sorter: (a, b) => moment(a.createTime) - moment(b.createTime)
        },
        {
          title: "反馈时间",
          dataIndex: "finishTime",
          sorter: (a, b) => moment(a.finishTime) - moment(b.finishTime)
        },
        {
          title: "备注",
          dataIndex: "memo",
          scopedSlots: { customRender: "memo" }
        },
        {
          title: "反馈信息",
          dataIndex: "feedback",
          scopedSlots: { customRender: "feedback" }
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
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
      this.$store
        .dispatch("withdraw/getApplyList", this.listQuery)
        .then(res => {
          this.tableLoading = false;
          this.data = res.data.list;
          this.data.forEach(element => {
            element.finishTime = element.finishTime
              ? moment(element.finishTime).format("YYYY-MM-DD HH:mm:ss")
              : "";
          });
          this.paginationProps.total = res.data.totalCount * 1;
        });
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
    // 日期选择
    datePickerOnOk(value) {
      if (value.length !== 0) {
        this.listQuery["qp-createTime-ge"] = moment(value[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.listQuery["qp-finishTime-le"] = moment(value[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.listQuery["qp-createTime-ge"] = "";
        this.listQuery["qp-finishTime-le"] = "";
      }
    },
    //接收
    receive(record) {
      this.$confirm({
        title: "确认要接收申请吗？",
        onOk: () => {
          this.$store.dispatch("withdraw/receiveApply", record.id).then(res => {
            this.$message.success("接收成功");
            this.getList();
          });
        }
      });
    },
    // 查看
    goDetail(record, status) {
      console.log(status);
      //   1 : 提现申请详情 , 2:驳回提现申请 , 3:确认提现申请
      if (status == "detail") {
        this.title = 1;
      } else if (status == "refuse") {
        this.title = 2;
      } else if (status == "confirm") {
        this.title = 3;
      }
      this.$store
        .dispatch("withdraw/getApplyDetail", record.id)
        .then(res => {
          this.detailInfo = res.data;
        })
        .finally(() => {
          this.visibleDetail = true;
        });
      this.detailData = {};
      this.visibleDetail = true;
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
