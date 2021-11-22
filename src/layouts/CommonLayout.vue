<template>
  <div class="common-layout">
    <div class="content"><slot></slot></div>
    <!-- 底部 -->
    <!-- <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer> -->
  </div>
</template>

<script>
// import PageFooter from '@/layouts/footer/PageFooter'
import {mapState} from 'vuex'

export default {
  name: 'CommonLayout',
  // components: {PageFooter},
  computed: {
    ...mapState('setting', ['footerLinks', 'copyright'])
  }
}
</script>

<style scoped lang="less">
.common-layout{
  background: #ccc;
  height: 100vh;
}
</style>
