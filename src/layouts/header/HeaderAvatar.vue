<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="small"
        shape="circle"
        :src="userInfo.photo"
      />
      <span class="name">{{ userInfo.username }}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item @click="handleGoUserCenter">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <!-- <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item> -->
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderAvatar",
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {};
  },
  methods: {
    // 跳转个人中心
    handleGoUserCenter() {
      this.$router.push("/personal/account/information");
    },
    // 退出
    logout() {
      this.$store.dispatch("user/logout").then(res => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
