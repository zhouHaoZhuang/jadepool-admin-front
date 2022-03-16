<template>
  <common-layout class="register-container">
    <div class="register-wrap">
      <div class="img-bg"></div>
      <div class="register">
        <div class="tabs-wrap">
          <div class="tabs-item">
            注册
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
              autoComplete="new-password"
              placeholder="请输入密码"
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
              style="width:219px"
              placeholder="输入验证码"
              v-number-evolution
              :max-length="6"
              size="large"
            />
            <CodeBtn
              :phone="form.phone"
              codeType="1"
              sendType="0"
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
              style="width:210px"
              size="large"
              @keyup="getCode"
            />
            <div @click="refreshCode()" class="code" title="点击切换验证码">
              <Identify :identifyCode="identifyCode" />
            </div>
          </a-form-model-item>
          <a-form-model-item class="btn-box">
            <a-button
              class="submit-btn"
              type="primary"
              size="large"
              @click="handleRegister"
              :loading="loading"
            >
              注册
            </a-button>
            <a-button
              type="link"
              style="padding-right:0"
              size="large"
              @click="handleJumpLogin"
            >
              登录已有帐户
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div><a-radio @change="toCheck"></a-radio>我已阅读并同意<a href="">《用户注册服务协议》</a>,<a href="">《隐私协议》</a></div>
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
      labelCol: { span: 0 },
      wrapperCol: { span: 24, offset: 0 },
      form: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: "",
        verificationCode: "", //输入的图片验证码
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
      identifyCode: "", //要核对的验证码
      showVerfication: false ,//是否进行图片验证码
      isCheck:false, //是否勾选了协议
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
      if(this.isCheck == false){
        this.$message.warning("请勾选协议");
        return
      }
      this.$refs.ruleForm.validate(valid => {
        console.log("点击了注册");
        // if (valid) {
        //   this.loading = true;
        //   this.$store
        //     .dispatch("user/register", this.form)
        //     .then(res => {
        //       if (res.data?.id) {
        //         this.$message.success("注册成功");
        //         this.$router.push("/login");
        //       } else {
        //         this.$message.warning("注册失败");
        //       }
        //     })
        //     .finally(() => {
        //       this.loading = false;
        //     });
        // }
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
      this.$refs.ruleForm.validateField(
        "verificationCode",
        err => (flag = err ? false : true)
      );
      callback(flag);
    },
    // 是否显示图片校验
    showValidate(callback) {
      let isShow = true;
      this.showVerfication = true;
      callback(isShow);
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = getRandomCode();
    },
    //是否调用发送验证码接口
    getCode() {
      if (this.$refs.verificationCode.value == this.identifyCode) {
        console.log("相等");
        this.$refs.child.getMsg();
      }
    },
    //勾选协议选项
    toCheck(e){
      this.isCheck = e.target.checked
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  background: #406ad3;
  position: relative;
  .img-bg {
    flex: 1;
    height: 450px;
    background: url("../../assets/img/passport/login.jpg") no-repeat center;
    background-size: cover;
    margin-right: 100px;
  }
  .register-wrap {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .register {
      width: 440px;
      height: 510px;
      border-radius: 5px;
      border-radius: 4px;
      padding: 20px  40px 40px;
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
    }
    .submit-btn {
      width: 145px;
      margin-right: 89px;
    }
  }
}
</style>
<style lang="less" scoped>
.beauty-scroll {
  overflow-y: auto !important;
}
.register-container {
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
  right: -122px;
  top: -10px;
}
</style>
