<template>
  <div class="orderList">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            style="width:150px"
            v-model="listQuery.key"
            placeholder="请选择"
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
            @change="changeStart"
            @openChange="handleStartOpenChange"
          />
          <span class="zhi">至</span>
          <a-date-picker
            v-model="endValue"
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
            style="width:150px"
            placeholder="计费方式"
            allowClear
            v-model="listQuery.chargingType"
          >
            <a-select-option
              v-for="(value, key) in charingStatus"
              :key="key"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width: 120px"
            defaultValue="0"
            placeholder="订单类型"
            v-model="listQuery['qp-tradeType-eq']"
          >
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
            placeholder="状态"
            v-model="listQuery['qp-tradeStatus-eq']"
          >
            <a-select-option
              :value="index"
              v-for="(item, index) in orderStatusEnum"
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
        <div slot="customerName" slot-scope="text, record">
          {{ record.customerName }}
          <br />
          <span> {{ record.customerCode }}</span>
        </div>
        <div slot="corporationCode" slot-scope="text, record">
          {{ text }}
          <span> {{ record.corporationName }}</span>
        </div>
        <div slot="chargingType" slot-scope="text">
          {{ charingStatus[text] }}
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
import {
  feeReduction,
  orderStatus,
  orderStatusEnum,
  charingStatus
} from "@/utils/enum.js";
export default {
  data() {
    return {
      feeReduction,
      orderStatus,
      orderStatusEnum,
      charingStatus,
      // search: "",
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        },
        {
          title: "订单类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 150
        },
        {
          title: "所属渠道商",
          dataIndex: "customerName",
          key: "customerName",
          width: 180,
          scopedSlots: { customRender: "customerName" }
        },
        {
          title: "所属终端客户",
          dataIndex: "corporationCode",
          key: "corporationCode",
          width: 180,
          scopedSlots: { customRender: "corporationCode" }
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
          title: "折扣率",
          dataIndex: "discountRate",
          key: "discountRate",
          scopedSlots: { customRender: "discountRate" },
          width: 100
        },
        {
          title: "状态",
          dataIndex: "tradeStatus",
          key: "tradeStatus",
          width: 130,
          scopedSlots: { customRender: "tradeStatus" }
        },
        {
          title: "计费方式",
          dataIndex: "chargingType",
          key: "chargingType",
          width: 100,
          scopedSlots: { customRender: "chargingType" }
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
      this.$getListQp("financialOrder/getList", this.listQuery)
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
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
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
     this.listQuery.currentPage = 1;
      this.getList();
    },
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
