<template>
  <common-layout class="login-container">
    <div class="login-wrap">
      <div class="img-bg"></div>
      <div class="login">
        <div class="tabs-wrap">
          <div class="tabs-item">
            登录
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
          <a-form-model-item prop="verificationCode">
            <a-input
              type="text"
              style="width:200px"
              size="large"
              v-model="form.verificationCode"
              placeholder="请输入图片验证码"
              :max-length="6"
              @pressEnter="onSubmit"
            >
              <a-icon slot="prefix" type="safety-certificate" />
            </a-input>
            <div @click="refreshCode()" class="code" title="点击切换验证码">
              <Identify :identifyCode="identifyCode" />
            </div>
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

          <!-- <a-form-model-item class="btn-box">
            <a-button
              size="large"
              class="btn1"
              type="link"
              @click="resetPassword"
            >
              忘记密码
            </a-button>
            <a-button
              size="large"
              class="btn2"
              type="link"
              @click="handleJumpRegister"
            >
              免费注册
            </a-button>
          </a-form-model-item> -->
        </a-form-model>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  name: "Login",
  components: { CommonLayout, Identify },
  data() {
    return {
      loginStatus: "pwd",
      form: {
        username: "",
        password: "",
        verificationCode: ""
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
        verificationCode: [
          {
            required: true,
            message: "请输入图片校验码",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.identifyCode) {
                callback(new Error("图形验证码不正确"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      identifyCode: ""
    };
  },
  mounted() {
    this.refreshCode();
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
    },
    // 获取验证码组件校验图形验证
    validateImgCode(callback) {
      let flag = false;
      this.$refs.ruleForm.validateField(
        "verificationCode",
        err => (flag = err ? false : true)
      );
      callback(flag);
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
    },
    // 跳转注册
    handleJumpRegister() {
      this.$router.push("/register");
    },
    // 跳转重置密码
    resetPassword() {
      this.$router.push("/resetpassword");
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background: #406ad3;
  position: relative;
  .img-bg {
    flex: 1;
    height: 450px;
    background: url("../../assets/img/passport/login.jpg") no-repeat center;
    background-size: cover;
    margin-right: 100px;
  }
  .login-wrap {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login {
    width: 410px;
    height: 450px;
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
          width: 100%;
          height: 2px;
          background: #406ad3;
        }
        overflow: hidden;
      }
    }
    .login-btn {
      width: 100%;
      background: #406ad3;
      margin-top: 20px;
    }
  }
  .code {
    position: absolute;
    right: -128px;
    top: -10px;
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
