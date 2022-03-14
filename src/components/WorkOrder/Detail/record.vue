<template>
  <div class="work-record-container">
    <div class="title">沟通记录</div>
    <div class="record-list">
      <div class="item-wrap" v-for="item in recordList" :key="item.id">
        <!-- 正常沟通记录 -->
        <div v-if="item.replyType === 1" class="item">
          <div class="left">
            <div class="ava">
              <img
                v-if="item.identityType === 1"
                src="@/assets/img/workOrder/user.png"
                alt=""
              />
              <img v-else src="@/assets/img/workOrder/customer.png" alt="" />
            </div>
            <div class="info-box">
              <div :class="`top-title ${getClassName(item.identityType)}`">
                <span v-if="item.identityType === 1">企业客户</span>
                <span v-if="item.identityType === 2">渠道商</span>
                <span v-if="item.identityType === 3">云盾客服</span>
                <span v-if="item.secret === 1" class="ml10">
                  [私密回复](仅平台客服和云技术客服可见)
                </span>
              </div>
              <div class="info-txt">
                {{ item.replyDetail }}
                <a-button
                  v-if="item.identityType === 3 && detail.status !== 3"
                  class="btn-link ml10"
                  type="link"
                  @click="handleDelRecord(item)"
                >
                  撤回回复
                </a-button>
              </div>
              <div class="info-img">
                <img
                  v-for="ele in item.replyUrl"
                  :key="ele"
                  :src="ele"
                  preview="1"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="right">
            {{ item.createTime | formatDate }}
          </div>
        </div>
        <!-- 移交工单记录 -->
        <div v-else class="move-item">
          <div class="box">
            <div class="txt">
              备注消息: {{ item.createTime | formatDate }}
              <span class="red">仅平台客服可见</span>
            </div>
            <div class="txt">
              工单由[{{ item.transferUser }}]移交, 备注:{{ item.replyDetail }}
            </div>
            <div class="txt">移交方式: 指定人员, [{{ item.receiverUser }}]</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 消息记录列表
    recordList: {
      type: Array,
      default: () => []
    },
    // 工单详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 根据用户类型返回不同类名
    getClassName() {
      return function(val) {
        if (val === 1) {
          return "";
        }
        if (val === 2) {
          return "info-txt";
        }
        if (val === 3) {
          return "sys-txt";
        }
        return "";
      };
    }
  },
  data() {
    return {};
  },
  methods: {
    // 撤回回复
    handleDelRecord(record) {
      this.$confirm({
        title: "确定要撤回回复吗?",
        onOk: () => {
          this.$store.dispatch("workorder/messageDel", record.id).then(res => {
            this.$message.success("撤回回复成功");
            this.$emit("success");
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.work-record-container {
  padding-bottom: 24px;
  margin-bottom: 18px;
  background: #fff;
  font-size: 12px;
  .ml10 {
    margin-left: 10px;
    color: red;
  }
  .btn-link {
    padding: 0;
  }
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
  .record-list {
    .item-wrap {
      margin: 0 25px;
      padding: 20px 0;
      border-bottom: 1px solid #ebebeb;
      &:last-child {
        border-bottom: none;
      }
    }
    .item {
      display: flex;
      justify-content: space-between;

      .left {
        flex: 1;
        display: flex;
        .ava {
          width: 64px;
          height: 64px;
          margin-right: 25px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-box {
          flex: 1;
          .top-title {
            font-weight: bold;
            color: #555;
          }
          .customer-txt {
            color: #00aaff;
          }
          .sys-txt {
            color: #ff8800;
          }
          .info-txt {
            color: #999;
          }
          .info-img {
            display: flex;
            margin-top: 10px;
            img {
              margin-right: 6px;
              width: 100px;
              height: 100px;
              object-fit: cover;
            }
          }
        }
      }
      .right {
        width: 140px;
        text-align: right;
        color: #999;
      }
    }
    .move-item {
      // display: flex;
      // justify-content: space-between;
      .box {
        border: 1px solid #ff8800;
        border-left-width: 4px;
        padding: 5px 15px;
        font-size: 12px;
        background-color: #fff1e1;
        color: #ff8800;
        .txt {
          .red {
            color: red;
          }
        }
      }
    }
  }
}
</style>
