<template>
  <div class="enterprise-list-detail" v-if="data">
    <!-- 基础信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>基础资料</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">供应商名称:</div>
          <div class="value">{{ data.ecsBaseInfoResDto.supplierName }}</div>
        </div>
        <div class="item">
          <div class="label">供应商实例id:</div>
          <div class="value">
            {{ data.ecsBaseInfoResDto.supplierInstanceId }}
          </div>
        </div>

        <div class="item">
          <div class="label">采购账号：</div>
          <div class="value">{{ data.ecsBaseInfoResDto.purchaseAccount }}</div>
        </div>
        <div class="item">
          <div class="label">资源池实例ID：</div>
          <div class="value">{{ data.ecsBaseInfoResDto.instanceId }}</div>
        </div>
        <div class="item">
          <div class="label">渠道商：</div>
          <div class="value">{{ data.ecsBaseInfoResDto.channelName }}</div>
        </div>
        <div class="item">
          <div class="label"></div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <!-- 实例信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>实例信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">公网IP：</div>
          <div class="value">{{ data.publicIp[0] }}</div>
        </div>
        <div class="item">
          <div class="label">内网IP:</div>
          <div class="value">{{ data.intranetIp[0] }}</div>
        </div>
        <div class="item">
          <div class="label">所在区域：</div>
          <div class="value">{{ data.ecsBaseInfoResDto.region }}</div>
        </div>
        <div class="item">
          <div class="label">操作系统：</div>
          <div class="value">{{ data.osName }}</div>
        </div>
        <div class="item">
          <div class="label">登录名：</div>
          <div class="value">root</div>
        </div>
        <div class="item">
          <div class="label">远程端口：</div>
          <div class="value">22</div>
        </div>
        <!-- <div class="item">
          <div class="label">实例状态：</div>
          <div class="value">{{data.status}}</div>
        </div> -->
        <div class="item">
          <div class="label">运行状态：</div>
          <div class="value">{{ data.statusCn }}</div>
        </div>
        <!-- <div class="item">
          <div class="label">操作状态：</div>
          <div class="value">{{data.status}}</div>
        </div> -->
        <!-- <div class="item">
          <div class="label">备注：</div>
          <div class="value">{{data.a}}</div>
        </div> -->
      </div>
    </div>
    <!-- 配置信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>配置信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">CPU：</div>
          <div class="value">{{ data.cpu }}核</div>
        </div>
        <div class="item">
          <div class="label">内存：</div>
          <div class="value">{{ data.memory }}M</div>
        </div>
        <div class="item">
          <div class="label">带宽：</div>
          <div class="value">{{ data.internetMaxBandwidthOut }}M</div>
        </div>
        <div class="item">
          <div class="label">数据磁盘：</div>
          <div class="value">{{ data.dataDiskSize }}G</div>
        </div>
      </div>
    </div>
    <!-- 付费信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>付费信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">购买时间:</div>
          <div class="value">{{ data.creationTime | formatDate }}</div>
        </div>
        <!-- <div class="item">
          <div class="label">购买时长:</div>
          <div class="value">{{ data.a }}</div>
        </div> -->
        <div class="item">
          <div class="label">到期时间：</div>
          <div class="value">{{ data.expiredTime | formatDate }}</div>
        </div>
        <div class="item">
          <div class="label">续费方式：</div>
          <div class="value">
            {{ data.autoRenew == 1 ? "自动续费" : "未设置自动续费" }}
          </div>
        </div>
        <!-- <div class="item">
          <div class="label">备注：</div>
          <div class="value">{{data.a}}</div>
        </div> -->
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>订单信息</span>
      </div>
      <div class="bot-content1">
        <a-table
          :columns="columns"
          :data-source="orderInfo"
          rowKey="orderNo"
          :pagination="false"
        >
          <span slot="tradeType" slot-scope="text">
            {{ tradeTypeEnum[text] }}
          </span>
          <div slot="ecsPrice" slot-scope="text, record">
            CPU: {{ record.ecsPrice.cpu }}核 内存: {{ record.ecsPrice.memory }}G
            数据磁盘: {{ record.ecsPrice.dataDiskSize }}G 带宽:
            {{ record.ecsPrice.internetMaxBandwidthOut }}M
          </div>
          <div slot="select" slot-scope="text">
            <a-button type="link" @click="select(text)">查看</a-button>
          </div>
        </a-table>
      </div>
    </div>
    <!-- 操作日志 -->
    <!-- <div class="tabs-content">
      <div class="top-title">
        <span>操作日志</span>
      </div>
      <div class="bot-content1">
        <a-table :columns="columnss" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div> -->
  </div>
</template>

<script>
import { tradeTypeEnum, runningStatusEnum } from "@/utils/enum";
export default {
  data() {
    return {
      tradeTypeEnum,
      runningStatusEnum,
      columns: [
        {
          title: "订单标号",
          dataIndex: "orderNo"
        },
        {
          title: "类型",
          dataIndex: "tradeType",
          scopedSlots: { customRender: "tradeType" }
        },
        {
          title: "时间",
          dataIndex: "salTime"
        },
        {
          title: "订单金额",
          dataIndex: "actualAmount"
        },
        {
          title: "配置信息",
          dataIndex: "ecsPrice",
          scopedSlots: { customRender: "ecsPrice" }
        },
        {
          title: "查看",
          dataIndex: "id",
          fixed: "right",
          scopedSlots: { customRender: "select" }
        }
      ],
      columnss: [
        {
          title: "编号",
          dataIndex: "id"
        },
        {
          title: "操作",
          dataIndex: "age"
        },
        {
          title: "操作人",
          dataIndex: ""
        },
        {
          title: "时间",
          dataIndex: ""
        },
        {
          title: "详情",
          dataIndex: ""
        }
      ],
      data: null,
      orderInfo: []
    };
  },
  activated() {
    this.getListas();
  },
  methods: {
    //获取
    getListas() {
      this.$store
        .dispatch("instance/getListas", { id: this.$route.query.id })
        .then(res => {
          this.data = { ...res.data };
          this.orderInfo = res.data.orderInfoReDtoList;
          this.orderInfo[0].config = res.data;
        });
    },
    select(id) {
      this.$router.push({
        path: "/finance/index/orderinfo",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .top-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      padding-left: 30px;
      padding-right: 15px;
      border-bottom: 1px solid #ccc;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .update {
        padding: 5px 10px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
    .bot-content {
      padding: 20px 30px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .label {
          width: 120px;
          text-align: right;
          margin-right: 8px;
        }
        .value {
          flex: 1;
        }
      }
      .item-row {
        width: 100%;
      }
    }
    .bot-content1 {
      padding: 20px 30px;
    }
  }
}
</style>
