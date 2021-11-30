<template>
  <common-layout class="login-wrap">
    <div class="login">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item prop="username">
          <a-input v-model="form.username" size="large" placeholder="账户">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            v-model="form.password"
            size="large"
            placeholder="密码"
            type="password"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" :loading="loading" @click="onSubmit"
            >登录</a-button
          >
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
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 600px;
  }
}
</style>
