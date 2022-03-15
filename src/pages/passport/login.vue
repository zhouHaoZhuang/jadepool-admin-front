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
        <!-- <div class="tabs-wrap">
          <div class="tabs-item">
            账号密码登录
          </div>
        </div> -->
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="账号密码登录">
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
                  @pressEnter="onSubmit"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
          <!-- <a-tab-pane key="2" tab="短信验证码登录" force-render> -->
          <a-tab-pane key="2" tab="" force-render disabled>
            <a-form-model ref="ruleForm" :model="form" :rules="rules">
              <a-form-model-item prop="phone">
                <a-input
                  v-model="form.phone"
                  addon-before="+86"
                  placeholder="11位手机号"
                  v-number-evolution
                  :max-length="11"
                  size="large"
                />
              </a-form-model-item>
              <a-form-model-item prop="verificationCode">
                <a-input
                  type="text"
                  style="width:200px"
                  size="large"
                  v-model="form.verificationCode"
                  placeholder="请进行图片验证"
                  :max-length="6"
                />
                <div @click="refreshCode()" class="code" title="点击切换验证码">
                  <Identify :identifyCode="identifyCode" />
                </div>
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
                <CodeBtn
                  :phone="form.phone"
                  size="large"
                  @validate="validateImgCode"
                />
              </a-form-model-item>
            </a-form-model>
          </a-tab-pane>
        </a-tabs>
        <a-button
          class="login-btn"
          type="primary"
          size="large"
          :loading="loading"
          @click="onSubmit"
        >
          登录
        </a-button>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import CodeBtn from "@/components/CodeBtn/index";
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  name: "Login",
  components: { CommonLayout, CodeBtn, Identify },
  data() {
    return {
      loginStatus: "pwd",
      form: {
        username: "",
        password: "",
        code: "",
        phone: "",
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
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "change"]
          }
        ],
        verificationCode: [
          {
            required: true,
            message: "请输入图片图片校验码",
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
      let count = 0;
      const pwdArr = ["username", "password"];
      const codeArr = ["phone", "code", "verificationCode"];
      // 密码登录
      if (this.loginStatus == "pwd") {
        let isAllowNext = false; // 是否允许下一步
        pwdArr.forEach(item => {
          this.$refs.ruleForm.validateField(item, errorMsg => {
            // 返回值为空时，验证通过；返回值非空时，验证失败
            if (errorMsg) return;
          });
          // 如果某个字段校验通过则计数+1
          ++count;
        });
        console.log(count, "count");
        count === pwdArr.length ? (isAllowNext = true) : "";
        if (isAllowNext) {
          this.loading = true;
          let newObj = {};
          newObj.username = this.form.username;
          newObj.password = this.form.password;
          this.$store
            .dispatch("user/login", newObj)
            .then(res => {
              this.$router.push("/");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
      // 手机验证码登录
      if (this.loginStatus == "code") {
        let isAllowNext = false;
        codeArr.forEach(item => {
          this.$refs.ruleForm.validateField(item, errorMsg => {
            if (errorMsg) return;
          });
          ++count;
        });
        count === codeArr.length ? (isAllowNext = true) : "";
        if (isAllowNext) {
          let newObj = {};
          newObj.phone = this.form.phone;
          newObj.code = this.form.code;
          newObj.verificationCode = this.form.verificationCode;
          // this.loading = true;
          // this.$store
          //   .dispatch("user/login", newObj)
          //   .then(res => {
          //     this.$router.push("/");
          //   })
          //   .finally(() => {
          //     this.loading = false;
          //   });
        }
      }
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
    //切换登录方式
    callback(key) {
      console.log(key);
      if (key == 1) {
        this.loginStatus = "pwd";
      } else {
        this.loginStatus = "code";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background: #406ad3;
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
