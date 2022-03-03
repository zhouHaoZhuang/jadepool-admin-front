<template>
  <div>
    <div class="enterprise-list-detail">
      <div class="tabs-content">
        <div class="bot-content">
          <!-- <div class="item">
            <div class="label">姓名：</div>
            <div class="value">{{ userInfo.username }}</div>
          </div>
          <div class="item">
            <div class="label">手机：</div>
            <div class="value">{{ userInfo.phone }}</div>
          </div>
          <div class="item">
            <div class="label">邮箱：</div>
            <div class="value">{{ userInfo.email }}</div>
          </div>
          <div class="item">
            <div class="label">角色:</div>
            <div class="value">{{ userInfo.limit }}</div>
          </div> -->
          <div class="item1">
            <a-form-model
              ref="ruleForm"
              :model="form"
              :rules="rules"
              v-bind="layout"
            >
              <!-- <a-form-model-item has-feedback label="旧密码" prop="oldPassword">
                <a-input
                  style="width:250px"
                  v-model="ruleForm.oldPassword"
                  type="password"
                  autocomplete="off"
                ></a-input>
              </a-form-model-item> -->
              <a-form-model-item prop="phone" label="手机号码">
                <a-input
                  v-model="form.phone"
                  style="width:260px"
                  addon-before="+86"
                  placeholder="11位手机号"
                  v-number-evolution
                  :max-length="11"
                  size="large"
                />
              </a-form-model-item>
              <a-form-model-item class="code-wrap" prop="code" label="验证码">
                <a-input
                  v-model="form.code"
                  style="width:150px"
                  placeholder="输入验证码"
                  v-number-evolution
                  :max-length="6"
                  size="large"
                />
                <CodeBtn :phone="form.phone" codeType="1" size="large" />
              </a-form-model-item>
              <a-form-model-item prop="password" label="新密码">
                <a-input-password
                  v-model="form.password"
                  :max-length="20"
                  autocomplete="new-password"
                  placeholder="6 - 20位密码，区分大小写"
                  size="large"
                  @keydown.native="keydown($event)"
                />
              </a-form-model-item>
              <a-form-model-item prop="confirmPassword" label="确认密码">
                <a-input-password
                  v-model="form.confirmPassword"
                  :max-length="20"
                  placeholder="确认密码"
                  size="large"
                  @keydown.native="keydown($event)"
                />
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="handleRegister">
                  确认修改
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CodeBtn from "@/components/CodeBtn/index";

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: { CodeBtn },
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
      pwdReg: /(?=.*[0-9])(?=.*[a-z]).{6,20}/,
      form: {
        phone: "",
        code: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
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
        password: [
          { validator: validatePass, trigger: ["blur", "change"] },
          {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"]
          }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: ["blur", "change"] },
          {
            required: true,
            message: "请输入确认密码",
            trigger: ["blur", "change"]
          }
        ]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 }
      }
    };
  },
  methods: {
    // 禁止输入空格
    keydown(event) {
      if (event.keyCode == 32) {
        event.returnValue = false;
      }
    },
    // 修改密码
    handleRegister() {
      console.log("点击", this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/changePassword", this.form)
            .then(res => {
              this.$message.success("修改成功");
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
        confirmPassword: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .bot-content {
      align-items: center;
      padding: 50px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding-top: 25px;
      }
      .item {
        padding-top: 10px;
      }
    }
  }
}
</style>
