<template>
  <div class="orderInfo" v-if="data[0]">
    <!-- 订单信息 -->
    <div v-if="orderInfo" class="channel">
      <p>订单信息</p>
      <ul>
        <li>
          <span>订单编号:</span>
          <span>{{ orderInfo.orderNo }}</span>
        </li>
        <li>
          <span>订单类型:</span>
          <span>{{ feeReduction[orderInfo.tradeType] }} </span>
        </li>
        <li>
          <span>状态:</span>
          <span>{{ orderStatusEnum[orderInfo.tradeStatus] }}</span>
        </li>
        <li>
          <span>创建时间:</span>
          <span>{{ orderInfo.createTime | formatDate }}</span>
        </li>
      </ul>
    </div>
    <!-- 支付信息 -->
    <div class="channel">
      <p>支付信息</p>
      <ul>
        <li>
          <span>支付金额:</span>
          <span>{{ orderInfo.actualAmount }}</span>
        </li>
        <li>
          <span>支付时间:</span>
          <span>{{ orderInfo.payTime | formatDate }}</span>
        </li>
        <!-- <li>
          <span>支付状态:</span>
          <span>{{ orderInfo.payStatus == 1 ? "待支付" : "已支付" }}</span>
        </li> -->
      </ul>
    </div>
    <!-- 产品信息 -->
    <div class="channel">
      <p>产品信息</p>
      <div class="config">
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="corporationCode"
          :pagination="false"
        >
          <div slot="chargingType" slot-scope="text">
            {{ charingStatus[text] }}
          </div>
          <div slot="ecsPrice" slot-scope="text, record">
            <div v-if="record.chargingType == 'AfterPay'">
              {{ record.productName }}功能开通：按流量计费
            </div>
            <div v-else>
              <div>CPU：{{ text.cpu }}</div>
              <div>内存：{{ text.memory }}</div>
              <!-- <div>磁盘：{{ diskLength }}</div> -->
              <div>系统盘:{{ systemDiskSize }}G</div>
              <div>数据盘:{{ dataDiskSize }}G</div>
              <div>带宽：{{ text.internetMaxBandwidthOut }}</div>
              <div>防御：{{ "20G" }}</div>
              <div>镜像：{{ text.imageId }}</div>
              <div>所在区：{{ regionDataEnum[text.regionId] }}</div>
            </div>
          </div>
          <div slot="amount" slot-scope="text, record">
            <span v-if="record.chargingType == 'AfterPay'">--</span>
            <span v-else>{{ text }}</span>
          </div>
          <div slot="discountRate" slot-scope="text, record">
            <span v-if="record.chargingType == 'AfterPay'">--</span>
            <span v-else>{{ text }}</span>
          </div>
        </a-table>
      </div>
    </div>
    <!-- 客户信息 -->
    <div class="channel">
      <p>客户信息</p>
      <ul>
        <li>
          <span>渠道商ID:</span>
          <span>{{ data[0].customerCode }}</span>
        </li>
        <li>
          <span>渠道商名称:</span>
          <span>{{ data[0].customerName }}</span>
        </li>
        <li>
          <span>租户ID:</span>
          <span>{{ data[0].tenantId }}</span>
        </li>
        <li>
          <span>客户ID:</span>
          <span>{{ data[0].corporationCode }} </span>
        </li>
        <li>
          <span>客户名称:</span>
          <span>{{ data[0].corporationName }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  orderStatus,
  feeReduction,
  regionDataEnum,
  charingStatus,
  orderTypeMap,
  orderStatusEnum
} from "@/utils/enum.js";
export default {
  data() {
    return {
      orderStatus,
      feeReduction,
      regionDataEnum,
      orderInfo: null,
      charingStatus,
      orderStatusEnum,
      orderTypeMap,
      data: [],
      systemDiskSize: 0,
      dataDiskSize: 0,
      diskLength: 0, //磁盘长度
      columns: [
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: 100
        },
        {
          title: "具体配置",
          dataIndex: "ecsPrice",
          key: "ecsPrice",
          scopedSlots: { customRender: "ecsPrice" }
        },
        {
          title: "计费方式",
          dataIndex: "chargingType",
          key: "chargingType",
          scopedSlots: { customRender: "chargingType" }
        },
        {
          title: "数量",
          dataIndex: "ecsPrice.amount",
          key: "ecsPrice.amount",
          width: 100,
          scopedSlots: { customRender: "amount" }
        },
        {
          title: "原价",
          dataIndex: "originAmount",
          key: "originAmount"
        },
        {
          title: "推广优惠",
          dataIndex: "discountAmount",
          key: "discountAmount",
          width: 100
        },
        {
          title: "折扣",
          dataIndex: "discountRate",
          key: "discountRate",
          scopedSlots: { customRender: "discountRate" }
        },
        {
          title: "成交价",
          dataIndex: "actualAmount",
          key: "actualAmount"
        }
      ]
    };
  },
  activated() {
    let id = this.$route.query.id;
    this.$store.dispatch("financialOrder/getOne", id).then(res => {
      // let dataDiskSize = 0;
      if (res.data.ecsPrice) {
        let dataDisk = res.data.ecsPrice.dataDisk;
        this.systemDiskSize = res.data.ecsPrice.systemDisk.size;
        for (let index = 0; index < dataDisk.length; index++) {
          this.dataDiskSize += dataDisk[index].size;
        }
      }
      // if(res.data.ecsPrice){
      // let dataDisk = res.data.ecsPrice.dataDisk? res.data.ecsPrice.dataDisk.length:0;
      // console.log(dataDisk,'dataDisk');
      // this.diskLength = dataDisk + 1
      // }
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
          width: 82px;
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
