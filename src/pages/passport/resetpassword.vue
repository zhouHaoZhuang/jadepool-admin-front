<template>
  <common-layout class="reset-container">
    <div class="reset-wrap">
      <div class="img-bg"></div>
      <div class="reset">
        <div class="tabs-wrap">
          <div class="tabs-item">
            忘记密码
          </div>
        </div>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item prop="phone">
            <a-input
              v-model="form.phone"
              placeholder="请输入账号"
              v-number-evolution
              :max-length="11"
              size="large"
            />
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input-password
              v-model="form.password"
              v-password-input
              type="password"
              :max-length="20"
              placeholder="请输入密码"
              autoComplete="new-password"
              size="large"
              @keydown.native="keydown($event)"
            />
          </a-form-model-item>
          <a-form-model-item prop="confirmPassword">
            <a-input-password
              v-model="form.confirmPassword"
              v-password-input
              type="password"
              :max-length="20"
              placeholder="请再次输入密码"
              size="large"
              @keydown.native="keydown($event)"
            />
          </a-form-model-item>
          <a-form-model-item class="code-wrap" prop="code">
            <a-input
              v-model="form.code"
              placeholder="请输入验证码"
              v-number-evolution
              :max-length="6"
              size="large"
            />
            <CodeBtn
              codeType="3"
              sendType="0"
              :phone="form.phone"
              size="large"
              @validate="validateImgCode"
              @showValidate="showValidate"
              ref="child"
            />
          </a-form-model-item>
          <a-form-model-item prop="verificationCode" v-show="showVerfication">
            <a-input
              type="text"
              ref="verificationCode"
              v-model="form.verificationCode"
              placeholder="请输入图形验证码"
              :max-length="4"
              style="width:218px"
              size="large"
              @keyup="getCode"
            />
            <div @click="refreshCode()" class="code" title="点击切换验证码">
              <Identify :identifyCode="identifyCode" />
            </div>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 24, offset: 0 }">
            <a-button
              type="primary"
              style="width: 145px;"
              @click="handleRegister"
              :loading="loading"
            >
              确认
            </a-button>
            <a-button style="margin-left: 96px;" @click="handleJumpLogin">
              登录已有帐户
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
import Identify from "@/components/Identify";
import { getRandomCode } from "@/utils/index";
export default {
  components: { CommonLayout, CodeBtn, Identify },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!this.pwdReg.test(value)) {
          callback(new Error("密码格式不正确"));
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      form: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: ""
      },
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
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
        password: [{ validator: validatePass, trigger: ["blur", "change"] }],
        confirmPassword: [
          { validator: validatePass2, trigger: ["blur", "change"] }
        ],
        verificationCode: [
          {
            required: true,
            message: "请输入图形验证码",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, callback) => {
              if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                callback(new Error("图形验证码不正确"));
              }
              callback();
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      showVerfication: false, //是否进行图片验证码
      identifyCode: "" //要核对的验证码
    };
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    // 跳转登录
    handleJumpLogin() {
      this.$router.push("/login");
    },
    // 禁止输入空格
    keydown(event) {
      if (event.keyCode == 32) {
        event.returnValue = false;
      }
    },
    handleRegister() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/changePassword", this.form)
            .then(res => {
              this.$message.success("重置密码成功");
              this.$router.push("/login");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        phone: "",
        code: "",
        password: "",
        confirmPassword: "",
        verificationCode: ""
      };
    },
    // 获取验证码组件校验图形验证
    validateImgCode(callback) {
      let flag = false;
      if (this.$refs.verificationCode.value) {
        console.log(this.$refs.verificationCode.value, "1111111111");
        this.$refs.ruleForm.validateField(
          "verificationCode",
          err => (flag = err ? false : true)
        );
        callback(flag);
      }
      console.log(this.$refs.verificationCode.value, "22222");
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
    },
    // 是否显示图片校验
    showValidate(callback) {
      let isShow = true;
      this.showVerfication = true;
      callback(isShow);
    },
    //是否调用发送验证码接口
    getCode() {
      if (this.$refs.verificationCode.value == this.identifyCode) {
        console.log("相等");
        this.$refs.child.getMsg();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.reset-container {
  background: #406ad3;
  position: relative;
  .img-bg {
    flex: 1;
    height: 450px;
    background: url("../../assets/img/passport/login.jpg") no-repeat center;
    background-size: cover;
    margin-right: 100px;
  }
  .reset-wrap {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .reset {
      width: 410px;
      height: 495px;
      border-radius: 5px;
      border-radius: 4px;
      padding: 40px;
      background: #fff;
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
    }
    .submit-btn {
      width: 200px;
    }
  }
}
/deep/ .ant-form-item-children {
  display: flex;
}
</style>
<style lang="less" scoped>
.beauty-scroll {
  overflow-y: auto !important;
}
.reset-container {
  .code-wrap,
  .btn-box {
    .ant-form-item-children {
      display: flex;
      justify-content: space-between;
    }
  }
}
.code {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
