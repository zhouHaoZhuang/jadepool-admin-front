<template>
  <div class="orderList">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            style="width:150px"
            :placeholder="title"
            v-model="title"
            @change="changeKey"
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
          <a-input
            :disabled="!isTime"
            placeholder="搜索关键词"
            allow-clear
            v-model="listQuery.search"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD 00:00:00"
            placeholder="开始时间"
            :disabled="isTime"
            @change="changeStart"
            @openChange="handleStartOpenChange"
          />
          <span class="zhi">至</span>
          <a-date-picker
            v-model="endValue"
            :disabled="isTime"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD 00:00:00"
            placeholder="结束时间"
            @change="changeEnd"
            @openChange="handleEndOpenChange"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width: 120px"
            defaultValue="0"
            v-model="listQuery['qp-tradeType-eq']"
            ><a-select-option value="">
              订单类型
            </a-select-option>
            <a-select-option
              :value="index"
              v-for="(item, index) in feeReduction"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width: 130px"
            defaultValue="0"
            v-model="listQuery['qp-tradeStatus-eq']"
            ><a-select-option value="">
              状态
            </a-select-option>
            <a-select-option
              :value="index"
              v-for="(item, index) in orderStatus"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="secectClick">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="public-table-wrap">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :scroll="{ x: 1400 }"
        :loading="loading"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <div slot="originAmount" slot-scope="text">
          {{ text.toFixed(2) }}
        </div>
        <div slot="actualAmount" slot-scope="text">
          {{ text.toFixed(2) }}
        </div>
        <div slot="tradeType" slot-scope="text">
          <span>{{ feeReduction[text] }}</span>
        </div>
        <div slot="action" slot-scope="text">
          <a-button type="link" @click="selectPool(text)">
            查看
          </a-button>
        </div>
        <div slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="payTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="tradeStatus" slot-scope="text">
          {{ orderStatus[text] }}
        </div>
        <!-- <div slot="select" slot-scope="text">
            <a-button
              v-if="text.payStatus === 1"
              type="link"
              @click="selectPool(text)"
            >
              查看(1)
            </a-button>
            <a-button v-else type="link">
              ——————
            </a-button>
          </div> -->
      </a-table>
    </div>
  </div>
</template>

<script>
import { feeReduction, orderStatus } from "@/utils/enum.js";
export default {
  data() {
    return {
      title: "orderNo",
      feeReduction,
      orderStatus,
      // search: "",
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        "qp-createTime-ge": "",
        "qp-createTime-le": "",
        "qp-tradeType-eq": "",
        "qp-tradeStatus-eq": ""
      },
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        },
        {
          title: "渠道ID",
          dataIndex: "cutomerCode",
          key: "cutomerCode",
          width: 180
        },
        {
          title: "订单类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 150
        },
        {
          title: "原价",
          dataIndex: "originAmount",
          key: "originAmount",
          scopedSlots: { customRender: "originAmount" },
          width: 100
        },
        {
          title: "成交价",
          dataIndex: "actualAmount",
          key: "actualAmount",
          scopedSlots: { customRender: "actualAmount" },
          width: 100
        },
        {
          title: "状态",
          dataIndex: "tradeStatus",
          key: "tradeStatus",
          width: 130,
          scopedSlots: { customRender: "tradeStatus" }
        },
        // {
        //   title: '现金支付',
        //   dataIndex: 'cashPly',
        //   key: 'cashPly',
        //   width: 100,
        // },
        {
          title: "折扣率",
          dataIndex: "discountRate",
          key: "discountRate",
          width: 100
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 190,
          scopedSlots: { customRender: "createTime" }
        },

        {
          title: "支付时间",
          dataIndex: "payTime",
          key: "payTime",
          width: 250,
          scopedSlots: { customRender: "payTime" }
        },
        // {
        //   title: "查询",
        //   fixed: "right",
        //   key: "selects",
        //   scopedSlots: { customRender: "select" }
        // },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      dataAll: [],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )}  页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      },
      num: "",
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true,
      loading: false
    };
  },
  activated() {
    this.getList();
  },

  computed: {
    useColumns() {
      return [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        },
        {
          title: "渠道ID",
          dataIndex: "cutomerCode",
          key: "cutomerCode",
          width: 150
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 190,
          scopedSlots: { customRender: "createTime" }
        }
      ];
    }
  },
  methods: {
    getList() {
      this.loading = true;
      this.$store
        .dispatch("financialOrder/getList", this.listQuery)
        .then(res => {
          this.paginationProps.total = res.data.totalCount * 1;
          this.data = res.data.list;
          this.loading = false;
        });
    },
    changeStart(date, dateString) {
      this.listQuery["qp-createTime-ge"] = dateString;
    },
    changeEnd(date, dateString) {
      this.listQuery["qp-createTime-le"] = dateString;
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    changepage(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      // console.log("改变了分页的大小", current, pageSize);
      this.paginationProps.currentPage = current;
      this.paginationProps.pageSize = pageSize;
      this.getList();
    },
    selectPool(v, i) {
      this.$router.push({
        path: "/finance/order/detail",
        query: {
          id: v.id
        }
      });
    },
    secectClick() {
      this.listQuery.key = this.title;
      if (this.title == "createTime") {
        this.getList();
      } else {
        // this.$getListQp(this.title, this.search, this.startValue, this.endValue);
        // let tempSearch = this.listQuery.search;
        if (this.title == "payStatus") {
          if (this.listQuery.search == "支付") {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == "未支付") {
            this.listQuery.search = 0;
          }
        }
        this.$getListQp("financialOrder/getList", this.listQuery).then(val => {
          // console.log(val, "时间请求结果");
          this.paginationProps.total = val.data.totalCount * 1;
          this.data = val.data.list;
        });
      }
    },
    changeKey(val) {
      // console.log(val);
      this.title = val;
      if (this.title !== "createTime") {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.orderList {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  .zhi {
    margin: 10px;
  }
  .orderTable {
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
      background-color: rgb(64, 169, 255);
      color: rgb(255, 255, 255);
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
