<template>
  <div class="message-detail-container">
    <div class="title">关于“2021金秋上云季”活动下线通知</div>
    <div class="date">2021-11-10</div>
    <div class="line"></div>
    <div class="con-box">
      <div class="start-title">尊敬的合作商：</div>
      <p class="txt txt-indent">
        本次“2021金秋上云季”活动将于2021年10月27日
        18:00下线。请及时登录瑶池后台关闭活动，并取消活动页面入口。
      </p>
      <p class="txt txt-indent">感谢您对云盾云的支持！</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.message-detail-container {
  background: #fff;
  height: 500px;
  margin: 0 24px;
  padding: 24px;
  color: #000;
  font-size: 14px;
  .title {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .date {
    text-align: center;
  }
  .line {
    height: 2px;
    background: #ccc;
    margin: 20px 0;
  }
  .start-title{
    margin-bottom: 10px;
  }
  .txt{
    margin: 0;
    line-height: 22px;
  }
  .txt-indent {
    text-indent: 2em;
  }
}
</style>
