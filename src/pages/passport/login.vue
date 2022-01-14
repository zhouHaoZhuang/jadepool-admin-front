<template>
  <common-layout class="login-container">
    <div class="login">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item prop="username">
          <a-input v-model="form.username" placeholder="账户">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input v-model="form.password" placeholder="密码" type="password">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            style="width:100%"
            type="primary"
            :loading="loading"
            @click="onSubmit"
          >
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      form: {
        username: "",
        password: ""
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
  background: #26a6f5;
  .login {
    width: 460px;
    // height: 320px;
    height: 270px;
    border-radius: 4px;
    padding: 30px 20px 40px;
    padding-top: 50px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
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
