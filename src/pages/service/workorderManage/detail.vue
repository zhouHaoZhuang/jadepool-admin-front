<template>
  <div class="work-detail-container">
    <!-- 头部信息 -->
    <Detail :detail="detail" @success="detailSuccess" />
    <!-- 沟通记录 -->
    <Record :recordList="recordList" :detail="detail" @success="getRecord" />
    <!-- 发表回复 -->
    <Reply :detail="detail" @success="getRecord" />
  </div>
</template>

<script>
import Detail from "@/components/WorkOrder/Detail/detail";
import Record from "@/components/WorkOrder/Detail/record";
import Reply from "@/components/WorkOrder/Detail/reply";
export default {
  components: {
    Detail,
    Record,
    Reply
  },
  data() {
    return {
      time: null,
      step: 1,
      detail: {},
      recordList: []
    };
  },
  activated() {
    this.getDetail();
    this.getRecord();
    this.startTime();
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path !== "/service/workorderManage/detail") {
          this.time && clearInterval(this.time);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取我的工单详情
    getDetail() {
      this.$store
        .dispatch("workorder/workOrderDetail", {
          queryType: 2,
          workOrderNo: this.$route.query.workOrderNo
        })
        .then(res => {
          this.detail = { ...res.data };
        });
    },
    // 获取消息记录
    getRecord() {
      this.$store
        .dispatch("workorder/messageList", {
          queryType: 2,
          workOrderNo: this.$route.query.workOrderNo
        })
        .then(res => {
          this.recordList = res.data.map(ele => {
            return {
              ...ele,
              replyUrl: ele.replyUrl ? ele.replyUrl.split(",") : []
            };
          });
          this.$nextTick(() => {
            this.$previewRefresh();
          });
        });
    },
    // 头部操作后的回调
    detailSuccess() {
      this.getDetail();
    },
    // 定时轮询
    startTime() {
      this.time && clearInterval(this.time);
      this.time = setInterval(() => {
        this.getDetail();
        this.getRecord();
      }, 5000);
    }
  }
};
</script>

<style lang="less" scoped>
.work-detail-container {
  margin: 0 20px;
  padding-bottom: 30px;
}
</style>
