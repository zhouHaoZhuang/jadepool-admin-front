<template>
  <div class="orderInfo">
    <!-- 订单信息 -->
    <div class="channel">
      <p>订单信息</p>
      <ul>
        <li>
          <span>退单编号:</span>
          <!-- <span>{{ orderInfo.orderNo }}</span> -->
          <span>1</span>
        </li>
        <li>
          <span>订单编号:</span>
          <span>1</span>

          <!-- <span>{{ orderInfo.orderNo }}</span> -->
        </li>
        <li>
          <span>订单类型:</span>
          <span>1</span>

          <!-- <span>{{ orderTypeMap[orderInfo.tradeType] }} </span> -->
        </li>
        <li>
          <span>创建时间:</span>
          <span>1</span>

          <!-- <span>{{ orderInfo.createTime | formatDate }}</span> -->
        </li>
        <li>
          <span>退款原因:</span>
          <span>1</span>

          <!-- <span>{{ orderStatusEnum[orderInfo.tradeStatus] }}</span> -->
        </li>
      </ul>
    </div>
    <!-- 退款信息 -->
    <div class="channel">
      <p>退款信息</p>
      <ul>
        <li>
          <span>退款金额:</span>
          <span>1</span>

          <!-- <span>{{ data[0].corporationCode }}</span> -->
        </li>
        <li>
          <span>退款状态:</span>
          <span>1</span>

          <!-- <span>{{ data[0].realName }} </span> -->
        </li>
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
          <div slot="tradeType" slot-scope="text">
            {{ text }}
            <!-- {{ orderTypeMap[text] }} -->
          </div>
          <div slot="productConfig" slot-scope="text, record">
            <div>CPU:{{ record.cpu }}核</div>
            <div>内存:{{ record.memory }}G</div>
            <div>带宽:{{ record.internetMaxBandwidthOut }}M</div>
            <div>系统盘:{{ record.systemDiskSize }}G</div>
            <div>数据盘:{{ record.dataDiskSize }}G</div>
            <div>操作系统:{{ record.osName }}</div>
            <div>所在区:{{ regionDataEnum[record.regionId] }}</div>
          </div>
          <span slot="chargeModel">包年包月</span>
        </a-table>
      </div>
    </div>

    <!-- 客户信息 -->
    <div class="channel">
      <p>客户信息</p>
      <ul>
        <li>
          <span>客户ID:</span>
          <span>1</span>

          <!-- <span>{{ data[0].corporationCode }}</span> -->
        </li>
        <li>
          <span>客户名称:</span>
          <span>1</span>

          <!-- <span>{{ data[0].realName }} </span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { orderStatusEnum, orderTypeMap, regionDataEnum } from "@/utils/enum.js";
export default {
  data() {
    return {
      orderInfo: null,
      data: [],
      orderStatusEnum,
      orderTypeMap,
      regionDataEnum,
      columns: [
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: 100
        },
        {
          title: "具体配置",
          key: "productConfig",
          width: 250,
          scopedSlots: { customRender: "productConfig" }
        },
        {
          title: "计费方式",
          dataIndex: "chargeModel",
          key: "chargeModel",
          scopedSlots: { customRender: "chargeModel" }
        },
        {
          title: "订单金额",
          dataIndex: "actualAmount",
          key: "actualAmount"
        },
        {
          title: "退款金额",
          dataIndex: "originAmount",
          key: "originAmount"
        }
      ]
    };
  },
  activated() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("financialOrder/getOne", id).then(res => {
      console.log(res);
      // let dataDisk = res.data.ecsPrice.dataDisk;
      // let dataDiskSize = 0;
      // if (dataDisk) {
      //   for (let index = 0; index < dataDisk.length; index++) {
      //     dataDiskSize += dataDisk[index].size;
      //   }
      //   res.data.ecsPrice.dataDiskSize = dataDiskSize;
      // }
      // console.log(dataDisk);
      this.orderInfo = {};
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
    .allocation {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 5px;
      line-height: 65px;
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
