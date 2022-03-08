<template>
  <div class="supplier-add">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="采购账号ID" prop="accountCode">
          {{ form.accountCode }}
        </a-form-model-item>
        <a-form-model-item label="所属供应商" prop="supplierCode">
          {{ form.supplierCode }}
        </a-form-model-item>
        <!-- <a-form-model-item label="供应商标识" prop="supplierAccountCode">
          <a-input v-model="form.supplierAccountCode" />
        </a-form-model-item> -->
        <a-form-model-item label="账号标识" prop="accountTag">
          <a-input v-model="form.accountTag" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.remark" />
        </a-form-model-item>
        <a-form-model-item label="账号配置">
          <a-input-password
            v-model="form.keyConfig"
            autoComplete="new-password"
          />
        </a-form-model-item>
        <a-form-model-item label="开启预警信息通知" prop="notice">
          <a-radio-group v-model="form.notice">
            <a-radio :value="true">
              开启
            </a-radio>
            <a-radio :value="false">
              关闭
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="采购账号预警值"
          prop="warningValue"
          help="该值为数字"
        >
          <a-input-number v-model="form.warningValue" :min="0" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: "",
      form: {
        accountCode: "",
        supplierCode: "",
        accountTag: "",
        supplierAccountCode: "",
        remark: "",
        keyConfig: "",
        notice: undefined,
        warningValue: ""
      },
      rules: {
        accountCode: [
          {
            required: true,
            message: "请输入采购账号ID",
            trigger: "blur"
          }
        ],
        supplierCode: [
          {
            required: true,
            message: "请输入所属供应商",
            trigger: "blur"
          }
        ],
        accountTag: [
          {
            required: true,
            message: "请输入供应商标识",
            trigger: "blur"
          }
        ],
        supplierAccountCode: [
          {
            required: true,
            message: "请输入供应商侧账号ID",
            trigger: "blur"
          }
        ],
        notice: [
          {
            required: true,
            message: "请选择是否开启预警信息通知",
            trigger: "change"
          }
        ],
        warningValue: [
          {
            required: true,
            message: "请输入采购账号预警值",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  activated() {
    this.resetForm();
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("purchase/getId", id).then(res => {
      this.form = res.data;
      this.form.keyConfig = this.form.keyConfig
        ? JSON.stringify(res.data.keyConfig)
        : "";
      // console.log(res.data);
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        console.log(this.form);
        this.form.keyConfig = JSON.parse(this.form.keyConfig);
        if (valid) {
          this.$store.dispatch("purchase/edit", this.form).then(val => {
            console.log(val);
            this.$message.success("提交成功");
            this.$router.back();
            this.resetForm();
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        accountCode: "",
        supplierCode: "",
        accountTag: "",
        supplierAccountCode: "",
        remark: "",
        keyConfig: "",
        notice: undefined,
        warningValue: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.supplier-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
