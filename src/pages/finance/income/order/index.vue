<template>
  <div class="orderList">
    <div class="orderTop">
      <a-space>
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
        <div class="sechkey">
          <a-input
            :disabled="!isTime"
            placeholder="搜索关键词"
            v-model="listQuery.search"
          />
        </div>
        <div>
          <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
            :disabled="isTime"
            @openChange="handleStartOpenChange"
          />
          <span class="zhi">至</span>
          <a-date-picker
            v-model="endValue"
            :disabled="isTime"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            @openChange="handleEndOpenChange"
          />
        </div>
        <a-button type="primary" @click="secectClick">
          查询
        </a-button>
      </a-space>
    </div>
    <div class="orderTable">
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
          :scroll="{ x: 1400 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="originAmount" slot-scope="v">
            {{v.toFixed(2)}}
          </div>
          <div slot="actualAmount" slot-scope="v">
            {{v.toFixed(2)}}
          </div>
          <div slot="tradeType" slot-scope="v">
             <span v-if="v === 1">新购</span>
            <span v-if="v === 5">升配</span>
            <span v-if="v === 10">降配</span>
            <span v-if="v === 15">续费</span>
            <span v-if="v === 20">退费</span>
          </div>
          <div slot="action" slot-scope="v">
            <a-button type="link" @click="selectPool(v)">
              查看
            </a-button>
          </div>
          <div slot="createTime" slot-scope="v">
            {{ v | formatDate }}
          </div>
          <div slot="payTime" slot-scope="v">
            {{ v | formatDate }}
          </div>
          <div
            :class="{ green: v === 1, blue: v !== 1 }"
            slot="payStatus"
            slot-scope="v"
          >
            {{ v === 1 ? "已支付" : "未支付" }}
          </div>
          <div slot="select" slot-scope="v">
            <a-button type="link" @click="selectPool(v)">
              {{ v.payStatus === 1 ? "查看(1)" : "——————" }}
            </a-button>
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "orderNo",
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
          title: "渠道ID",
          dataIndex: "cutomerCode",
          key: "cutomerCode",
          width: 150
        },
        {
          title: "订单类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 100
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
          dataIndex: "payStatus",
          key: "payStatus",
          width: 100,
          scopedSlots: { customRender: "payStatus" }
        },
        {
          title: "现金支付",
          dataIndex: "cashPly",
          key: "cashPly",
          width: 100
        },
        {
          title: "代金券支付",
          dataIndex: "discountPly",
          key: "discountPly",
          width: 150
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
        {
          title: "查询",
          fixed: "right",
          key: "selects",
          scopedSlots: { customRender: "select" }
        },
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
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} / ${Math.ceil(
            this.paginationProps.total / this.paginationProps.pageSize
          )}  页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      },
      num: "",
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true
    };
  },
  activated() {
    this.$store.dispatch("financialOrder/getList").then(res => {
      this.$store
        .dispatch("financialOrder/getAllList", {
          pageSize: res.data.totalCount * 1
        })
        .then(val => {
          // console.log(val);
          this.paginationProps.total = val.data.totalCount * 1;
          this.paginationProps.current = val.data.currentPage * 1;
          this.dataAll = val.data.list;
          this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
        });
    });
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
          title: "订单类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" },
          width: 100
        },
        {
          title: "状态",
          dataIndex: "payStatus",
          key: "payStatus",
          width: 100,
          scopedSlots: { customRender: "payStatus" }
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
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      if (current === 1) {
        this.data = this.dataAll.slice(0, pageSize);
      } else {
        this.data = this.dataAll.slice(
          (current - 1) * pageSize,
          current * pageSize
        );
      }
      // console.log(current, pageSize);
      // console.log(this.data, "data");
    },
    onShowSizeChange(current, pageSize) {
      // console.log("改变了分页的大小", current, pageSize);
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      if (current === 1) {
        this.data = this.dataAll.slice(0, pageSize);
      } else {
        this.data = this.dataAll.slice(
          (current - 1) * pageSize,
          current * pageSize
        );
      }
    },
    selectPool(v, i) {
      // if (!i && i != undefined) {
      //   return
      // }
      //  console.log(v.id);
      this.$router.push({
        path: "/finance/index/orderinfo",
        query: {
          id: v.id
        }
      });
    },
    secectClick() {
      this.listQuery.key = this.title;
      if (this.title == "createTime") {
        let startTime = this.startValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        let endTime = this.endValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        // console.log(this.title, this.search, startTime, endTime);
        this.$store
          .dispatch("financialOrder/selectList", {
            startTime,
            endTime
          })
          .then(val => {
            // console.log(val, "时间请求结果");
            this.paginationProps.total = val.data.totalCount * 1;
            this.paginationProps.current = val.data.currentPage * 1;
            this.dataAll = val.data.list;
            this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          });
      } else {
        // this.$getList(this.title, this.search, this.startValue, this.endValue);
        let tempSearch = this.listQuery.search;
        if (this.title == "tradeType") {
          if (this.listQuery.search == "销售") {
            this.listQuery.search = 5;
          }
          if (this.listQuery.search == "采购") {
            this.listQuery.search = 1;
          }
        }
        if (this.title == "payStatus") {
          if (this.listQuery.search == "支付") {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == "未支付") {
            this.listQuery.search = 0;
          }
        }
        this.$getList("financialOrder/getList", this.listQuery).then(val => {
          // console.log(val, "时间请求结果");
          this.paginationProps.total = val.data.totalCount * 1;
          this.paginationProps.current = val.data.currentPage * 1;
          this.dataAll = val.data.list;
          this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          this.listQuery.search = tempSearch;
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
  padding: 10px;
  background-color: #fff;
  .orderTop {
    display: flex;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-right: 20px;
    }
    [type="button"] {
      margin-left: 20px;
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
