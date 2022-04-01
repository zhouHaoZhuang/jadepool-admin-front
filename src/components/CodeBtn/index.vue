<template>
  <a-button
    class="code-btn"
    :size="size"
    :disabled="loading"
    @click="handleCode"
  >
    {{ btnTxt }}
  </a-button>
</template>

<script>
export default {
  props: {
    phone: {
      type: [String, Number]
    },
    size: {
      type: String,
      default: "default"
    },
    codeType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      btnTxt: "获取验证码",
      time: null,
      timeCount: 60,
      loading: false,
      phoneReg: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    };
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    handleCode() {
      if (!this.phone) {
        this.$message.warning("请正确输入手机号");
        return;
      }
      if (!this.phoneReg.test(this.phone)) {
        this.$message.warning("手机号格式不正确");
        return;
      }
      //判断父组件是否传递显示图片校验的方法
      if (this.$listeners["showValidate"]) {
        let isShow;
        this.$emit("showValidate", val => {
          isShow = val;
        });
        if (!isShow) {
          return;
        }
      }
      //判断父组件是否传递图片校验的方法
      if (this.$listeners["validate"]) {
        let flag;
        this.$emit("validate", val => {
          flag = val;
        });
        if (!flag) {
          return;
        }
      }
      if (this.loading) return;
      // this.getMsg();
    },
    startTime() {
      this.time = setInterval(() => {
        if (this.timeCount - 1 === 0) {
          clearInterval(this.time);
          this.btnTxt = "获取验证码";
          this.timeCount = 60;
          this.loading = false;
          return;
        }
        this.timeCount -= 1;
        this.btnTxt = this.timeCount + "S";
      }, 1000);
    },
    // 发送验证码
    getMsg() {
      if (this.loading) return;
      this.loading = true;
      this.$store
        .dispatch("user/sendCode", {
          receiverAccount: this.phone,
          codeType: this.codeType
        })
        .then(res => {
          this.startTime();
        })
        .finally(err => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.code-btn {
  width: 110px;
}
</style>
