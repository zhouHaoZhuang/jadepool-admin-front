<template>
  <div class="common-layout">
    <div class="content"><slot></slot></div>
    <!-- 底部 -->
    <!-- <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer> -->
    <div class="cloud-img"></div>
    <div class="footer">
      Copyright 2021 © 浙江云盾互联网科技有限公司 浙ICP备2021017872号-1
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
  .cloud-img {
    width: 100%;
    height: 330px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("../assets/img/passport/login_cloud.png") no-repeat center;
    background-size: cover;
  }
  .footer {
    width: 100%;
    text-align: center;
    color: #ccc;
    height: 50px;
    line-height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
