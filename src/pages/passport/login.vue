<template>
  <common-layout>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-form-item>
          <a-input
            autocomplete="autocomplete"
            size="large"
            placeholder="admin"
            v-decorator="['name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
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
            v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
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

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    onSubmit() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped></style>
