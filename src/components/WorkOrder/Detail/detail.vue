<template>
  <div class="work-top-container">
    <div class="title">基本信息</div>
    <div class="item-list">
      <div class="item">
        <div class="label">标题：</div>
        <div class="value">
          {{ detail.title }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单编号：</div>
        <div class="value">
          {{ detail.workOrderNo }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单分类：</div>
        <div class="value">
          {{ detail.questionCategoryName }}
        </div>
      </div>
      <div class="item">
        <div class="label">会员ID：</div>
        <div class="value">
          {{ detail.submitCode }}
        </div>
      </div>
      <div class="item">
        <div class="label">联系电话：</div>
        <div class="value">
          {{ detail.phoneNumber }}
        </div>
      </div>
      <div class="item">
        <div class="label">联系QQ：</div>
        <div class="value">
          {{ detail.qqNumber }}
        </div>
      </div>
      <div class="item">
        <div class="label">创建时间：</div>
        <div class="value">
          {{ detail.createTime | formatDate }}
        </div>
      </div>
      <div class="item">
        <div class="label">接单时间：</div>
        <div class="value">
          {{ detail.acceptTime | formatDate }}
        </div>
      </div>
      <div class="item">
        <div class="label">接单客服：</div>
        <div class="value">
          {{ detail.acceptName }}
        </div>
      </div>
      <div class="item">
        <div class="label">工单状态：</div>
        <div class="value">
          <a-tag v-if="detail.status === 1">
            待接单
          </a-tag>
          <a-tag v-if="detail.status === 2" color="blue">
            接单处理中
          </a-tag>
          <a-tag v-if="detail.status === 3" color="green">
            处理完成
          </a-tag>
        </div>
      </div>
      <div class="item">
        <div class="label">转单状态：</div>
        <div class="value">
          <a-tag v-if="detail.acceptStatus === 1">
            未转单
          </a-tag>
          <a-tag v-if="detail.acceptStatus === 2" color="blue">
            转单待接单
          </a-tag>
        </div>
      </div>
      <div class="item">
        <div class="label">结束时间：</div>
        <div class="value">
          <span v-if="detail.endTime">
            {{ detail.endTime | formatDate }}
          </span>
        </div>
      </div>
      <div class="item">
        <div class="label">工单评论：</div>
        <div class="value">
          <a-tag v-if="detail.evaluateStatus === 0">
            未评价
          </a-tag>
          <a-tag v-if="detail.evaluateStatus === 1" color="green">
            已评价
          </a-tag>
        </div>
      </div>
      <div class="item actions">
        <div class="label">操作：</div>
        <div class="value">
          <a-space>
            <a-button
              type="primary"
              v-if="!orderReceivingDisable"
              :disabled="true"
            >
              已接单
            </a-button>
            <a-button
              type="primary"
              v-if="orderReceivingDisable"
              :loading="orderReceivingLoading"
              @click="handleOrderReceiving"
            >
              接单
            </a-button>
            <a-button
              type="primary"
              v-if="detail.status === 2"
              @click="handleMoveWorkOrder"
            >
              移动工单
            </a-button>
            <a-button
              type="primary"
              v-if="detail.status !== 3"
              :loading="loading"
              @click="handleCloseWorkOrder"
            >
              关闭工单
            </a-button>
          </a-space>
        </div>
      </div>
    </div>
    <!-- 移动工单 -->
    <MoveWorkOrderModal
      v-model="moveWorkOrderVisible"
      :detail="detail"
      @success="successCallBack"
    />
  </div>
</template>

<script>
import { workOrderStatusEnum } from "@/utils/enum";
import MoveWorkOrderModal from "@/components/WorkOrder/Detail/moveWorkOrderModal.vue";
export default {
  components: {
    MoveWorkOrderModal
  },
  props: {
    // 工单详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    detail: {
      handler(newVal) {
        if (newVal.workOrderNo) {
          this.verifyReceiving();
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      workOrderStatusEnum,
      loading: false,
      orderReceivingLoading: false,
      moveWorkOrderVisible: false,
      orderReceivingDisable: false
    };
  },
  methods: {
    // 校验是否可以接单
    verifyReceiving() {
      this.$store
        .dispatch("workorder/verifyReceiving", {
          workOrderNo: this.detail.workOrderNo
        })
        .then(res => {
          this.orderReceivingDisable = res.data;
        });
    },
    // 成功回调
    successCallBack() {
      this.$emit("success");
    },
    // 接单
    handleOrderReceiving() {
      this.$confirm({
        title: "确认要接单吗？",
        onOk: () => {
          this.orderReceivingLoading = true;
          this.$store
            .dispatch("workorder/orderReceiving", {
              workOrderNo: this.detail.workOrderNo,
              receiverType: 2
            })
            .then(res => {
              this.$message.success("接单成功");
              this.$emit("success");
            })
            .finally(() => {
              this.orderReceivingLoading = false;
            });
        }
      });
    },
    // 移动工单
    handleMoveWorkOrder() {
      this.moveWorkOrderVisible = true;
    },
    // 关闭工单
    handleCloseWorkOrder() {
      this.$confirm({
        title: "确认要关闭工单吗？",
        onOk: () => {
          this.loading = true;
          this.$store
            .dispatch("workorder/closeWorkOrder", {
              workOrderNo: this.detail.workOrderNo
            })
            .then(res => {
              this.$message.success("关闭工单成功");
              this.verifyReceiving();
              this.$emit("success");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.work-top-container {
  padding-bottom: 24px;
  margin-bottom: 18px;
  background: #fff;
  position: relative;
  font-size: 12px;
  .title {
    border-bottom: 1px solid #ebebeb;
    padding-left: 32px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 10px;
    text-indent: 0;
    font-size: 14px;
    background-color: #fff;
    color: #292929;
  }
  .item-list {
    margin-top: 10px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    width: 33.33%;
    display: flex;
    margin-bottom: 13px;
    .label {
      width: 100px;
      color: #a0a2a3;
      text-align: right;
    }
  }
  .actions {
    width: 100%;
    align-items: center;
  }
  .wait {
    color: #262829;
    .icon {
      color: #00aaff;
      font-size: 18px;
    }
  }
  .center {
    color: #faad14;
    .icon {
      color: #faad14;
      font-size: 16px;
    }
  }
  .ok {
    color: #2bbe22;
    .icon {
      color: #2bbe22;
      font-size: 16px;
    }
  }
}
</style>
