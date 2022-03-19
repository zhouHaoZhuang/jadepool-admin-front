<template>
  <div class="orderList">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            class="sechkey"
            style="width:150px"
            placeholder="请选择"
            v-model="listQuery.key"
            allowClear
          >
            <a-select-option
              :value="v.key"
              v-for="v in useColumns"
              :key="v.title"
            >
              {{ v.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input allowClear placeholder="请输入" v-model="listQuery.search" />
        </a-form-model-item>
        <a-form-model-item>
          <a-range-picker
            style="margin-right: 10px"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="datePickerOnOk"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="orderTable">
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="tableLoading"
          :pagination="paginationProps"
          :scroll="{ x: 1400 }"
        >
          <span slot="corporationCode" slot-scope="text" style="color: #00aaff">
            {{ text }}
          </span>
          <div v-if="text" slot="originAmount" slot-scope="text">
            {{ text }}
          </div>
          <span slot="customer" slot-scope="text" style="color: #00aaff">
            {{ text }}
          </span>
          <span slot="channel" slot-scope="text" style="color: #00aaff">
            {{ text }}
          </span>
          <div v-if="text" slot="actualAmount" slot-scope="text">
            {{ text }}
          </div>
          <div slot="tradeType" slot-scope="text">
            <span>{{ orderTypeMap[text] }}</span>
          </div>
          <div slot="expiredTime" slot-scope="text" v-if="text">
            {{ text | formatDate }}
          </div>
          <div slot="payTime" slot-scope="text" v-if="text">
            {{ text | formatDate }}
          </div>
          <span
            :class="{ green: text === 9, blue: text !== 9 }"
            slot="tradeStatus"
            slot-scope="text"
          >
            {{ orderStatusEnum[text] }}
          </span>
          <div slot="action" slot-scope="text, record">
            <a-button v-permission="'view'" type="link" @click="toOnline(record)">
              上线
            </a-button>
               <a-button v-permission="'view'" type="link" @click="toOffline(record)">
              下线
            </a-button>
          </div>
          <div slot-scope="text" slot="cashPay" v-if="text != undefined">
            {{ text.toFixed(2) }}
          </div>
          <div slot-scope="text" slot="actualPrice" v-if="text != undefined">
            {{ text.toFixed(2) }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { orderStatusEnum, orderTypeMap } from "@/utils/enum.js";;
export default {
  data() {
    return {
      orderStatusEnum,
      orderTypeMap,
      listQuery: {
        key: undefined,
        search: "",
        startTime: "",
        endTime: "",
        tradeType: undefined,
        tradeStatus: undefined,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columns: [
        {
          title: "域名",
          dataIndex: "orderNo",
          width: 170,
        },
        {
          title: "所属终端客户",
          dataIndex: "corporationCode",
          width: 170,
          scopedSlots: { customRender: "corporationCode" }
        },
        {
          title: "CNAME",
          dataIndex: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 130
        },
        {
          title: "状态",
          dataIndex: "customer",
          width: 170,
          scopedSlots: { customRender: "customer" }
        },
        {
          title: "HTTPS",
          dataIndex: "originAmount",
          scopedSlots: { customRender: "originAmount" },
          width: 100
        },
        {
          title: "创建时间",
          dataIndex: "expiredTime",
          width: 190,
          scopedSlots: { customRender: "expiredTime" },
          sorter: (a, b) =>
            new Date(a.expiredTime).getTime() -
            new Date(b.expiredTime).getTime()
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  activated() {
    this.getList();
  },
  computed: {
    useColumns() {
      return [
        {
          title: "域名",
          dataIndex: "ordero",
          key: "ordero",
          width: 170
        },
        {
          title: "所属终端客户",
          dataIndex: "orderN",
          key: "orderN",
          width: 170
        },
        {
          title: "渠道商名称",
          dataIndex: "oNo",
          key: "oNo",
          width: 170
        },
        {
          title: "渠道商ID",
          dataIndex: "channel",
          key: "channel",
          width: 150
        }
      ];
    }
  },
  methods: {
    //查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("instance/getList", this.listQuery)
        .then(res => {
          // console.log(res);
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 搜索
    handleSearch() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 日期选择
    datePickerOnOk(value) {
      console.log(value);
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
    // 禁用日期--禁用当天之后+当天前一个月所有
    disabledDate(current) {
      return current > moment() || current < moment().subtract(1, "month");
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
    // 上线操作
    toOnline(record) {
      this.$confirm({
        title: "是否要恢复该域名的CDN服务？",
        onOk: () => {
          // this.$store
          //   .dispatch("channel/delPrice", { id: record.id })
          //   .then(res => {
          //     this.$message.success("操作成功");
          //     this.getList();
          //   });
        }
      });
    },
    //下线
    toOffline(record) {
         this.$confirm({
        title: "下线后，该域名将停止CDN服务，确定下线吗？",
        onOk: () => {
          // this.$store
          //   .dispatch("channel/delPrice", { id: record.id })
          //   .then(res => {
          //     this.$message.success("操作成功");
          //     this.getList();
          //   });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orderList {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .orderTop {
    display: flex;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-right: 10px;
    }
    [type="button"] {
      margin-left: 10px;
    }
    .zhi {
      margin: 10px;
    }
  }
  .orderTable {
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      font-size: 12px;
      padding: 2px 5px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
      background-color: rgb(64, 169, 255);
      color: rgb(255, 255, 255);
      font-size: 12px;
      padding: 2px 5px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
