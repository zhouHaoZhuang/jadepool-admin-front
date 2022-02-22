<template>
  <common-layout class="login-container">
    <!-- 左上角logo -->
    <div class="logo-wrap">
      <div class="txt">南天门</div>
      <div class="line"></div>
      <div class="txt">ntm.slayun.com</div>
    </div>
    <div class="login-wrap">
      <div class="img-bg"></div>
      <div class="login">
        <div class="tabs-wrap">
          <div class="tabs-item">
            账号密码登录
          </div>
        </div>
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-form-model-item prop="username">
            <a-input
              v-model="form.username"
              placeholder="请输入账号"
              size="large"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input
              v-model="form.password"
              placeholder="请输入密码"
              type="password"
              size="large"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item class="code-wrap" prop="code">
            <a-input
              v-model="form.code"
              style="width:200px"
              placeholder="输入验证码"
              v-number-evolution
              :max-length="6"
              size="large"
            >
              <a-icon slot="prefix" type="smile" />
            </a-input>
            <CodeBtn :phone="form.phone" size="large" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              class="login-btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="onSubmit"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import CodeBtn from "@/components/CodeBtn/index";

export default {
  name: "Login",
  components: { CommonLayout, CodeBtn },
  data() {
    return {
      form: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then(res => {
              this.$router.push("/");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background: #406ad3;
  position: relative;
  .logo-wrap{
    position: absolute;
    top: 60px;
    left: 100px;
    display: flex;
    align-items: center;
    .txt{
      font-size: 28px;
      color: #fff;
      font-weight: 500px;
    }
    .line{
      width: 2px;
      height: 35px;
      background: #fff;
      margin: 0 10px;
    }
  }
  .login-wrap {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .img-bg {
    flex: 1;
    height: 400px;
    background: url("../../assets/img/passport/login.jpg") no-repeat center;
    background-size: cover;
    margin-right: 100px;
  }
  .login {
    width: 410px;
    height: 400px;
    border-radius: 5px;
    border-radius: 4px;
    padding: 40px;
    background: #fff;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // z-index: 999;
    .tabs-wrap {
      display: flex;
      margin-bottom: 40px;
      .tabs-item {
        color: #406ad3;
        font-size: 16px;
        line-height: 26px;
        cursor: pointer;
        &::after {
          content: "";
          display: block;
          margin: 3px auto 0;
          width: 90%;
          height: 2px;
          background: #406ad3;
        }
        overflow: hidden;
      }
    }
    .login-btn {
      width: 100%;
      background: #406ad3;
    }
  }
}
</style>
<style lang="less">
.beauty-scroll {
  overflow-y: auto !important;
}
.login-container {
  .login-btn {
    margin-bottom: 10px;
  }
  .code-wrap,
  .btn-box {
    .ant-form-item-children {
      display: flex;
      justify-content: space-between;
      .btn1 {
        padding-left: 0;
      }
      .btn2 {
        padding-right: 0;
      }
    }
  }
}
</style>
