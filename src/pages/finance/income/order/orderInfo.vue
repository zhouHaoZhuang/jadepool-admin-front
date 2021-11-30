<template>
  <div class="orderInfo">
    <!-- 订单信息 -->
    <div v-if="orderInfo" class="channel">
      <p>订单信息</p>
      <ul>
        <li>
          <span>订单ID:</span>
          <span>{{ orderInfo.orderNo }}</span>
        </li>
        <li>
          <span>订单类型:</span>
          <span>{{ orderInfo.tradeType === 1 ? "采购" : "销售" }} </span>
        </li>
        <li>
          <span>创建时间:</span>
          <span>{{ orderInfo.createTime }}</span>
        </li>
        <li>
          <span>状态:</span>
          <span>{{ orderInfo.payStatus === 1 ? "支付" : "未支付" }}</span>
        </li>
        <li>
          <span>支付时间:</span>
          <span>{{ orderInfo.payTime }}</span>
        </li>
      </ul>
      <div class="config">
        <div>
          <span>价格备注:</span>
          <span>{{ orderInfo.jiage }}</span>
        </div>
        <div>
          <span>订单备注:</span>
          <span>{{ orderInfo.order }}</span>
        </div>
        <div>
          <span>配置信息</span>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :scroll="{ x: 1300 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
    <!-- 渠道商及企业信息 -->
    <div class="channel">
      <p>渠道商及企业信息</p>
      <ul>
        <li>
          <span>渠道商ID:</span>
          <span>c00001</span>
        </li>
        <li>
          <span>企业名称:</span>
          <span>浙江云盾互联网科技有限公司 </span>
        </li>
        <li>
          <span>简称:</span>
          <span>云盾信息</span>
        </li>
        <li>
          <span>企业ID:</span>
          <span>E00001</span>
        </li>
        <li>
          <span>企业名称:</span>
          <span>XXXX企业</span>
        </li>
        <li>
          <span>认证状态:</span>
          <span>已认证</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfo: null,
      data:[],
      columns: [
        {
          title: "产品名称",
          dataIndex: "title",
          key: "title",
          width: 100,
        },
        {
          title: "类型",
          dataIndex: "Type",
          key: "Type"
        },
        {
          title: "配置信息",
          dataIndex: "productInfo",
          key: "productInfo"
        },
        {
          title: "数量",
          dataIndex: "num",
          key: "num",
        },
        {
          title: "付费方式",
          dataIndex: "Payment",
          key: "Payment",
        },
        {
          title: "原价",
          dataIndex: "Originalprice",
          key: "Originalprice"
        },
        {
          title: "订单金额",
          dataIndex: "remark",
          key: "remark"
        },
        {
          title: "推广优惠",
          key: "Promote",
          dataIndex: "Promote",
        },
         {
          title: "代金券抵扣",
          key: "Voucher",
          dataIndex: "Voucher",
        },
         {
          title: "现金实付",
          key: "cash",
          dataIndex: "cash",
        }
      ],
    };
  },
  activated() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("financialOrder/getOne", id).then(res => {
      console.log(res);
      this.orderInfo = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.orderInfo {
  // background-color: #fff;
  margin: 0 24px;
  // padding: 16px;
  .channel {
    margin-bottom: 20px;
    background-color: #fff;
    > p {
      font-size: 16px;
      padding: 16px;
      padding-left: 30px;
      font-weight: 650;
      margin: 0;
      color: rgba(0, 0, 0, 0.847);
      border-bottom: 1px solid rgb(233, 233, 233);
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding-left: 10px;
      > li {
        list-style: none;
        width: 32%;
        > span:nth-child(1) {
          display: inline-block;
          width: 80px;
          text-align: right;
          padding-right: 8px;
          font-size: 14px;
          font-weight: 400;
          line-height: 65px;
          color: rgba(0, 0, 0, 0.847);
        }
      }
    }
    .config {
      > div {
        > span:nth-child(1) {
          display: inline-block;
          width: 80px;
          text-align: right;
          margin-right: 5px;
          line-height: 65px;
        }
      }
    }
  }
}
</style>
