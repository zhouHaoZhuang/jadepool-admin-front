<template>
  <div class="orderList">
    <div class="public-header-wrap">
      <a-space>
        <a-button type="primary" @click="addPrice">
          + 新建价格
        </a-button>
        <a-select
          style="width:150px"
          v-model="listQuery.key"
          allowClear
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

        <a-input
          :disabled="!isTime"
          placeholder="搜索关键词"
          allow-clear
          v-model="listQuery.search"
        />

        <a-button type="primary" @click="secectClick">
          查询
        </a-button>
      </a-space>
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
        <div slot="action" slot-scope="v">
          <a-space>
            <a-button type="link" @click="toDetail(v)">
              详情
            </a-button>
            <a-button type="link" @click="editPrice(v)">
              编辑
            </a-button>

            <a-button type="link" @click="delectPool(v.id)">
              删除
            </a-button>
          </a-space>
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
          title: "产品CODE",
          dataIndex: "productCode",
          key: "productCode"
        },
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "产品分类",
          dataIndex: "productTypeName",
          key: "productTypeName"
        },
        // {
        //   title: "供应商",
        //   dataIndex: "supplierName",
        //   key: "supplierName",
        //   scopedSlots: { customRender: "supplierName" }
        // },
        {
          title: "计费单位",
          dataIndex: "chargeUnit",
          key: "chargeUnit",
          scopedSlots: { customRender: "chargeUnit" }
        },
        {
          title: "所属地域",
          dataIndex: "regionName",
          key: "regionName"
        },
        {
          title: "标准单价",
          dataIndex: "standardPrice",
          scopedSlots: { customRender: "standardPrice" }
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
          title: "产品CODE",
          dataIndex: "productCode",
          key: "productCode",
          width: 170
        },
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: 150
        },
        // {
        //   title: "供应商",
        //   dataIndex: "createTime",
        //   key: "createTime",
        //   width: 190,
        //   scopedSlots: { customRender: "createTime" }
        // }
      ];
    }
  },
  methods: {
        //删除
    delectPool(id) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("price/delList", id).then(val => {
            this.$message.success("操作成功");
            this.getList()
          });
        }
      });
    },
     // 跳转至新增页面
    addPrice() {
      this.$router.push("/production/price/addPrice");
    },
       // 跳转至修改页面
    editPrice(v) {
      // console.log(v);
      this.$router.push({
        path: "/production/price/updatePrice",
        query: {
          id: v.id
        }
      });
    },
    //跳转详情页
    toDetail(v) {
      this.$router.push({
        path: "/production/price/priceDetail",
        query: {
          id: v.id
        }
      });
    },
    getList() {
      this.loading = true;
      this.$getListQp("price/getList", this.listQuery).then(res => {
        this.paginationProps.total = res.data.totalCount * 1;
        this.data = res.data.list;
        this.loading = false;
      });
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

    secectClick() {
      this.listQuery.currentPage = 1;
      this.getList();
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
