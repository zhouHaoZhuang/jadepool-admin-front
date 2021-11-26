<template>
  <div class="orderList">
    <div class="orderTop">
      <a-space>
        <a-select style="width:150px" :placeholder="title">
          <a-select-option value="订单编号1">
            <!-- {{ v.title }} -->
            订单编号
          </a-select-option>
          <a-select-option value="订单编号2">
            <!-- {{ v.title }} -->
            订单编号
          </a-select-option>
        </a-select>
        <div class="sechkey">
          <a-input placeholder="搜索关键词" v-model="search" />
        </div>
        <div>
          <a-date-picker placeholder="开始日期" @change="onChange" /><span
            class="zhi"
            >至</span
          >
          <a-date-picker placeholder="结束日期" @change="onChange" />
        </div>
        <a-button type="primary">
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
          :scroll="{ x: 1300 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="action" slot-scope="v">
            <a-button type="link" @click="editPool(v)">
              查看
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
      title: "订单编号",
      search: "",
      columns: [
        {
          title: "订单编号",
          dataIndex: "orderCode",
          key: "ordercode",
          width: 250
        },
        {
          title: "渠道ID",
          dataIndex: "channelId",
          key: "channelId"
        },
        {
          title: "订单类型",
          dataIndex: "OrderType",
          key: "OrderType"
        },
        {
          title: "原价",
          dataIndex: "Originalprice",
          key: "Originalprice",
          scopedSlots: { customRender: "Originalprice" }
        },
        {
          title: "成交价",
          dataIndex: "finalprice",
          key: "finalprice",
          scopedSlots: { customRender: "finalprice" }
        },
        {
          title: "状态",
          dataIndex: "state",
          key: "state"
        },
        {
          title: "现金支付",
          dataIndex: "cashPly",
          key: "cashPly"
        },
        {
          title: "代金券支付",
          dataIndex: "VoucherPly",
          key: "VoucherPly",
          width: 150
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime"
        },

        {
          title: "支付时间",
          dataIndex: "toPayTime",
          key: "toPayTime"
        },
        {
          title: "查询",
          dataIndex: "select",
          key: "select"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
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
      num: ""
    };
  },
  methods: {
    onChange(date, dateString) {
      // console.log(date, dateString);
    
    },
    changepage() {
      console.log("分页");
    },
    onShowSizeChange() {
      console.log("分页");
    },
    editPool(v) {
      console.log(v);
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
}
</style>
