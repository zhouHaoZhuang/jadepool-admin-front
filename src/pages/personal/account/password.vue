<template>
  <div>
    <div class="enterprise-list-detail">
      <div class="tabs-content">
        <div class="bot-content">
          <div class="item">
            <div class="label">姓名：</div>
            <div class="value">11111</div>
          </div>
          <div class="item">
            <div class="label">手机：</div>
            <div class="value"></div>
          </div>
          <div class="item">
            <div class="label">邮箱：</div>
            <div class="value"></div>
          </div>
          <div class="item">
            <div class="label">角色:</div>
            <div class="value"></div>
          </div>
          <div class="item1">
            <a-form-model
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              v-bind="layout"
            >
              <a-form-model-item has-feedback label="原密码:" prop="pass">
                <a-input
                  v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off"
                />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Confirm" prop="checkPass">
                <a-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                />
              </a-form-model-item>
              <a-form-model-item has-feedback label="Age" prop="age">
                <a-input v-model.number="ruleForm.age" />
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="submitForm('ruleForm')">
                  Submit
                </a-button>
                <a-button
                  style="margin-left: 10px"
                  @click="resetForm('ruleForm')"
                >
                  Reset
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
export default {
     data() {
    let checkPending;
    let checkAge = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error('Please input the age'));
      }
      checkPending = setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
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
      .item{
          padding-top: 10px;
      }
    }
  }
}
</style>
