<template>
  <div class="common-layout">
    <div class="header">
      <!-- 左上角logo -->
      <div class="logo-wrap">
        <div class="txt">南天门</div>
        <div class="line"></div>
        <div class="txt">ntm.slayun.com</div>
      </div>
    </div>
    <div class="content"><slot></slot></div>
    <!-- 底部 -->
    <!-- <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer> -->
    <div class="footer">
      Copyright 2022 © 上海言富科技有限公司 沪ICP备2021032365号
    </div>
  </div>
</template>

<script>
// import PageFooter from '@/layouts/footer/PageFooter'
import { mapState } from "vuex";

export default {
  name: "CommonLayout",
  // components: {PageFooter},
  computed: {
    ...mapState("setting", ["footerLinks", "copyright"])
  }
};
</script>

<style scoped lang="less">
.common-layout {
  height: 100vh;
  position: relative;
  .logo-wrap {
    position: absolute;
    top: 60px;
    left: 100px;
    display: flex;
    align-items: center;
    .txt {
      font-size: 28px;
      color: #fff;
      font-weight: 500px;
    }
    .line {
      width: 2px;
      height: 35px;
      background: #fff;
      margin: 0 10px;
    }
  }
  .footer {
    width: 100%;
    text-align: center;
    color: #fff;
    height: 38px;
    line-height: 38px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #395fbf;
    font-size: 12px;
  }
}
</style>
