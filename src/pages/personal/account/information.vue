<template>
  <div>
    <div class="enterprise-list-detail">
      <div class="tabs-content">
        <div class="bot-content">
          <div class="item">
            <div class="label">ID:</div>
            <div class="value">{{ userInfo.id }}</div>
          </div>
          <div class="item">
            <div class="label">姓名:</div>
            <div class="value">{{ userInfo.username }}</div>
          </div>
          <div class="item">
            <div class="label">角色权限：</div>
            <div class="value">{{ userInfo.limit }}</div>
          </div>
          <div class="item">
            <div class="label">手机：</div>
            <div class="value">{{ userInfo.phone }}</div>
          </div>
          <div class="item">
            <div class="label">邮箱：</div>
            <div class="value">{{ userInfo.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  created() {
    console.log(this.userInfo);
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .bot-content {
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding-top: 25px;
      }
    }
  }
}
</style>
