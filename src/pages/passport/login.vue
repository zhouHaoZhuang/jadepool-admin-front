<template>
  <common-layout class="login-wrap">
    <div class="login">
      <!-- <AuthingGuard :appId="appId" /> -->
      <a-form @submit="onSubmit" :form="form">
        <a-form-item>
          <a-input
            autocomplete="autocomplete"
            size="large"
            placeholder="admin"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入账户名', whitespace: true }
                ]
              }
            ]"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="888888"
            autocomplete="autocomplete"
            type="password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请输入密码', whitespace: true }
                ]
              }
            ]"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { AuthingGuard } from "@authing/vue-ui-components";
import "@authing/vue-ui-components/lib/index.min.css";

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      form: this.$form.createForm(this),
      appId: "619f2dac84bea60dbe1be5bf"
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("user/login").then(res => {
        this.$router.push("/");
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
