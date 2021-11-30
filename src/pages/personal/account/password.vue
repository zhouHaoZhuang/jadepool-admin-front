<template>
  <div>
    <div class="enterprise-list-detail">
      <div class="tabs-content">
        <div class="bot-content">
          <div class="item">
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
          </div>
          <div class="item1">
            <a-form-model
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              v-bind="layout"
            >
              <a-form-model-item has-feedback label="旧密码" prop="password">
                <a-input style="width:250px"></a-input>
              </a-form-model-item>
              <a-form-model-item has-feedback label="新密码:" prop="pass">
                <a-input
                  v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off"
                  style="width:250px"
                />
              </a-form-model-item>
              <a-form-model-item has-feedback label="确认密码" prop="checkPass">
                <a-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                  style="width:250px"
                />
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="submitForm('ruleForm')">
                  确认
                </a-button>
                <a-button
                  style="margin-left: 10px"
                  @click="resetForm('ruleForm')"
                >
                  重置
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
export default {
  name: "HeaderAvatar",
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认输入的密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不匹配!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("修改成功!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      //   padding: 20px 30px;
      //   display: flex;
      //   flex-direction: column;
      align-items: center;
      .item {
        padding-left: 175px;
        width: 33.3%;
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
