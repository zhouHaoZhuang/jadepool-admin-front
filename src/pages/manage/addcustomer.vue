<template>
  <div class="member-discount-update">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="客服姓名" prop="name">
          <a-input v-model="form.name" placeholder="请输入客服姓名"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="工号" prop="employeeId">
          <a-input v-model="form.employeeId" placeholder="请输入工号">
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="联系方式" prop="phone">
          <a-input v-model="form.phone" placeholder="请输入手机号"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="QQ类型" prop="qqType">
          <a-radio-group v-model="form.qqType">
            <a-radio value="个人"> 个人QQ </a-radio>
            <a-radio value="企业"> 企业QQ </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="QQ号" prop="qq">
          <a-input v-model="form.qq"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="微信类型" prop="wechatType">
          <a-radio-group v-model="form.wechatType">
            <a-radio value="个人"> 个人微信 </a-radio>
            <a-radio value="企业"> 企业微信 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="微信号" prop="wechat">
          <a-input v-model="form.wechat" />
        </a-form-model-item>

        <a-form-model-item label="二维码" prop="wechatUrl">
          <a-space :size="30">
            <Upload :defaultFile="form.wechatUrl" @change="pcImgChange" />
            <!-- <span class="preview-code" @click="preview">预览二维码</span> -->
          </a-space>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 11 }">
          <a-space :size="70">
            <a-button type="primary" @click="onSubmit" :loading="loading">
              提交
            </a-button>
            <a-button @click="back" :loading="loading"> 取消 </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/customerUpload";

export default {
  components: {
    Upload,
  },
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        name: undefined,
        employeeId: undefined,
        phone: undefined,
        qqType: "企业",
        qq: undefined,
        wechatType: "企业",
        wechat: undefined,
        wechatUrl: undefined,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入客服姓名",
            trigger: "blur",
          },
        ],
        employeeId: [
          {
            message: "请输入工号",
            trigger: "blur",
          },
        ],
        phone: [
         {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
          },
          {
            pattern: /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
            message: "联系方式格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        qqType: [
          {
            required: true,
            message: "请选择qq类型",
            trigger: "change",
          },
        ],
        qq: [
          {
            required: true,
            message: "请输入qq号",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "qq号格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        wechatType: [
          {
            required: true,
            message: "请选择微信类型",
            trigger: "change",
          },
        ],
        wechat: [
          {
            required: true,
            message: "请输入微信号",
            trigger: "blur",
          },
        ],
        wechatUrl: [
          {
            required: true,
            message: "请上传微信二维码",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      data: [],
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/channel/index/addcustomer") {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    preview() {
      if (this.form.wechatUrl === undefined) {
        this.$message.warn("请先上传二维码图片");
      } else {
        window.open(this.form.wechatUrl, true);
      }
    },
    pcImgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调99999", urlList, firstImageUrl);
      this.form.wechatUrl = firstImageUrl;
      this.$refs["ruleForm"].clearValidate(["wechatUrl"]);
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));
          this.$store
            .dispatch("customer/add", data)
            .then((res) => {
              this.$message.success("添加客服成功");
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    back() {
      this.$router.back();
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        name: undefined,
        employeeId: undefined,
        phone: undefined,
        qqType: "企业",
        qq: undefined,
        wechatType: "企业",
        wechat: undefined,
        wechatUrl: undefined,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.member-discount-update {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
    .preview-code {
      color: #169bd5;
      cursor: pointer;
    }
  }
}
</style>
