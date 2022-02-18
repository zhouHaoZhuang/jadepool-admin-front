<template>
  <div class="orderInfo" v-if="data[0]">
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
          <span>{{ orderInfo.tradeType === 1 ? "新购" : "销售" }} </span>
        </li>
        <li>
          <span>创建时间:</span>
          <span>{{ orderInfo.createTime | formatDate }}</span>
        </li>
        <li>
          <span>状态:</span>
          <span>{{ orderStatus[orderInfo.tradeStatus] }}</span>
        </li>
        <li>
          <span>支付时间:</span>
          <span>{{ orderInfo.payTime | formatDate }}</span>
        </li>
      </ul>
      <div class="config">
        <div>
          <span>价格备注:</span>
          <span>{{ orderInfo.priceRemark }}</span>
        </div>
        <div>
          <span>订单备注:</span>
          <span>{{ orderInfo.remark }}</span>
        </div>
        <div>
          <span>配置信息</span>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :scroll="{ x: 1300 }"
          :pagination='false'
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="tradeType" slot-scope="text">
            {{ feeReduction[text] }}
          </div>
          <div slot="ecsPrice" slot-scope="text">
            <div>CPU：{{ text.cpu }}</div>
            <div>内存：{{ text.memory }}</div>
            <div>磁盘：{{ text.dataDiskSize }}</div>
            <div>带宽：{{ text.internetMaxBandwidthOut }}</div>
            <div>防御：{{ "20G" }}</div>
            <!-- <div>操作系统：{{ text.osName }}</div>
            <div>所在区：{{ text.zoneId }}</div> -->
          </div>
        </a-table>
      </div>
    </div>
    <!-- 渠道商及企业信息 -->
    <div class="channel">
      <p>渠道商及企业信息</p>
      <ul>
        <li>
          <span>渠道商ID:</span>
          <span>{{ data[0].cutomerCode }}</span>
        </li>
        <li>
          <span>企业ID:</span>
          <span>{{ data[0].corporationCode }}</span>
        </li>

        <!-- <li>
          <span>企业名称:</span>
          <span>{{data[0].customerName}} </span>
        </li>
        <li>
          <span>简称:</span>
          <span>{{data[0].customerShortName}}</span>
        </li>
        <li>
          <span>企业名称:</span>
          <span>{{data[0].corporationName}}</span>
        </li>
        <li>
          <span>认证状态:</span>
          <span>{{data[0].certificationStatus}}</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { orderStatus, feeReduction } from "@/utils/enum.js";

export default {
  data() {
    return {
      orderStatus,
      feeReduction,
      orderInfo: null,
      data: [],
      columns: [
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: 100
        },
        {
          title: "类型",
          dataIndex: "tradeType",
          key: "tradeType",
          scopedSlots: { customRender: "tradeType" }
        },
        {
          title: "配置信息",
          dataIndex: "ecsPrice",
          key: "ecsPrice",
          scopedSlots: { customRender: "ecsPrice" }
        },
        {
          title: "数量",
          dataIndex: "ecsPrice.amount",
          key: "ecsPrice.amount"
        },
        // {
        //   title: "付费方式",
        //   dataIndex: "ecsPrice.chargeModel",
        //   key: "ecsPrice.chargeModel"
        // },
        {
          title: "原价",
          dataIndex: "originAmount",
          key: "originAmount"
        },
        {
          title: "订单金额",
          dataIndex: "actualAmount",
          key: "actualAmount"
        },
        {
          title: "推广优惠",
          key: "discountAmount",
          dataIndex: "discountAmount"
        },
        {
          title: "代金券抵扣",
          key: "discountRate",
          dataIndex: "discountRate"
        }
        // {
        //   title: "现金实付",
        //   key: "cash",
        //   dataIndex: "cash"
        // }
      ]
    };
  },
  activated() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("financialOrder/getOne", id).then(res => {
      // console.log(res);
      let dataDisk = res.data.ecsPrice.dataDisk;
      let dataDiskSize = 0;
      if (dataDisk) {
        for (let index = 0; index < dataDisk.length; index++) {
          dataDiskSize += dataDisk[index].size;
        }
        res.data.ecsPrice.dataDiskSize = dataDiskSize;
      }
      console.log(dataDisk);
      this.orderInfo = res.data;
      this.data = [res.data];
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
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      display: inline-block;
      font-size: 12px;
      width: 52px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
      display: inline-block;

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
