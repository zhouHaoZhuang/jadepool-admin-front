<template>
  <div>后台首页{{ userInfo.name }}</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      token1: state => state.user.token,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["token"])
  },
  created() {
    this.getList();
    console.log("查看vuex", this.token, this.token1, this.userInfo.name);
  },
  // activated() {
  //   this.getList();
  // },
  methods: {
    // 获取列表
    getList() {
      this.$store.dispatch("user/getList", { action: "apphome" }).then(res => {
        console.log("接口回调", res);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
