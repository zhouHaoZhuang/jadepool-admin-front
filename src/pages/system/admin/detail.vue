<template>
  <div class="system-role-detail-container">
    <div class="public-box">
      <div class="public-title">
        <div class="left-tit">基本信息</div>
      </div>
      <div class="public-con">
        <div class="item">
          <div class="label">角色Code：</div>
          <div class="value text-overflow">{{ detail.code }}</div>
        </div>
        <div class="item">
          <div class="label">角色描述：</div>
          <div class="value text-overflow">{{ detail.description }}</div>
        </div>
      </div>
    </div>
    <!-- 已授权用户 -->
    <AuthUser :code="code" />
    <!-- 已授权规则 -->
    <AuthRule :code="code" />
  </div>
</template>

<script>
import AuthUser from "@/components/System/authUser";
import AuthRule from "@/components/System/authRule";
export default {
  components: {
    AuthUser,
    AuthRule
  },
  data() {
    return {
      detail: {}
    };
  },
  computed: {
    code() {
      return this.$route.query.code;
    }
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/system/admin/detail") {
          this.getDetail();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取角色详情
    getDetail() {
      this.$store
        .dispatch("system/getRoleDetail", { code: this.code })
        .then(res => {
          this.detail = { ...res.data };
        });
    }
  }
};
</script>

<style lang="less" scoped>
.system-role-detail-container {
  background: #fff;
  padding: 24px 24px 4px;
  color: #000;
  .public-box {
    box-shadow: 0 6px 12px 0 #fbfcfd;
    border-radius: 8px;
    border: 1px solid #eee;
    margin-bottom: 24px;
    .public-title {
      height: 65px;
      padding: 0 32px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      .left-tit {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .public-con {
      padding: 24px 32px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        display: flex;
        align-items: center;
        .label {
          color: #9fabcb;
        }
        .value {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
