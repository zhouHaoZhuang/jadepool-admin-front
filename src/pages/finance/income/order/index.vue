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
            allow-clear
            v-model="listQuery.search"
          />
        </div>
        <div>
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
        </div>
        <a-select
          style="width: 120px"
          defaultValue="0"
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
          <div slot="select" slot-scope="text">
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
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { feeReduction, orderStatus } from '@/utils/enum.js';
export default {
  data() {
    return {
      title: 'orderNo',
      feeReduction,
      orderStatus,
      // search: "",
      listQuery: {
        key: undefined,
        search: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: '',
        endTime: '',
        'qp-tradeType-eq': '',
      },
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderNo',
          key: 'orderNo',
          width: 170,
        },
        {
          title: '渠道ID',
          dataIndex: 'cutomerCode',
          key: 'cutomerCode',
          width: 150,
        },
        {
          title: '订单类型',
          dataIndex: 'tradeType',
          key: 'tradeType',
          scopedSlots: { customRender: 'tradeType' },
          width: 150,
        },
        {
          title: '原价',
          dataIndex: 'originAmount',
          key: 'originAmount',
          scopedSlots: { customRender: 'originAmount' },
          width: 100,
        },
        {
          title: '成交价',
          dataIndex: 'actualAmount',
          key: 'actualAmount',
          scopedSlots: { customRender: 'actualAmount' },
          width: 100,
        },
        {
          title: '状态',
          dataIndex: 'tradeStatus',
          key: 'tradeStatus',
          width: 100,
          scopedSlots: { customRender: 'tradeStatus' },
        },
        // {
        //   title: '现金支付',
        //   dataIndex: 'cashPly',
        //   key: 'cashPly',
        //   width: 100,
        // },
        {
          title: '折扣率',
          dataIndex: 'discountRate',
          key: 'discountRate',
          width: 150,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 190,
          scopedSlots: { customRender: 'createTime' },
        },

        {
          title: '支付时间',
          dataIndex: 'payTime',
          key: 'payTime',
          width: 250,
          scopedSlots: { customRender: 'payTime' },
        },
        {
          title: '查询',
          fixed: 'right',
          key: 'selects',
          scopedSlots: { customRender: 'select' },
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
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
        onShowSizeChange: this.onShowSizeChange,
      },
      num: '',
      startValue: null,
      endValue: null,
      endOpen: false,
      isTime: true,
    };
  },
  activated() {
    this.getList();
  },

  computed: {
    useColumns() {
      return [
        {
          title: '订单编号',
          dataIndex: 'orderNo',
          key: 'orderNo',
          width: 170,
        },
        {
          title: '渠道ID',
          dataIndex: 'cutomerCode',
          key: 'cutomerCode',
          width: 150,
        },
        {
          title: '状态',
          dataIndex: 'payStatus',
          key: 'payStatus',
          width: 100,
          scopedSlots: { customRender: 'payStatus' },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 190,
          scopedSlots: { customRender: 'createTime' },
        },
      ];
    },
  },
  methods: {
    getList() {
      this.$store
        .dispatch('financialOrder/getList', this.listQuery)
        .then((res) => {
          this.paginationProps.total = res.data.totalCount * 1;
          this.data = res.data.list;
        });
    },
    changeStart(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    changeEnd(date, dateString) {
      this.listQuery.endTime = dateString;
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
        path: '/finance/index/orderinfo',
        query: {
          id: v.id,
        },
      });
    },
    secectClick() {
      this.listQuery.key = this.title;
      if (this.title == 'createTime') {
        this.getList();
      } else {
        // this.$getListQp(this.title, this.search, this.startValue, this.endValue);
        // let tempSearch = this.listQuery.search;
        if (this.title == 'payStatus') {
          if (this.listQuery.search == '支付') {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == '未支付') {
            this.listQuery.search = 0;
          }
        }
        this.$getListQp('financialOrder/getList', this.listQuery).then(
          (val) => {
            // console.log(val, "时间请求结果");
            this.paginationProps.total = val.data.totalCount * 1;
            this.data= val.data.list;
          }
        );
      }
    },
    changeKey(val) {
      // console.log(val);
      this.title = val;
      if (this.title !== 'createTime') {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },
  },
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
    [type='button'] {
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
