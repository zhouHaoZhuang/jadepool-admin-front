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
          {{form.accountCode}}
        </a-form-model-item>
        <a-form-model-item label="所属供应商" prop="supplierCode">
          {{form.supplierCode}}
        </a-form-model-item>
        <a-form-model-item label="供应商标识" prop="accountTag">
          <a-input v-model="form.accountTag" />
        </a-form-model-item>
        <a-form-model-item label="供应商侧账号ID" prop="supplierAccountCode">
          <a-input v-model="form.supplierAccountCode" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.remark" type="remark" />
        </a-form-model-item>
        <a-form-model-item label="账号配置">
          <a-input v-model="form.keyConfig" type="keyConfig" />
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
        keyConfig: ""
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
        ]
      },
      loading: false
    };
  },
   activated() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("purchase/getId", id).then(res => {
      this.form = res.data
      // console.log(res.data);
    });
    // console.log(form, "********");
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        console.log(this.form);
        this.$store.dispatch("purchase/edit", this.form).then(val => {
          console.log(val);
          this.$message.success("提交成功");
          this.$router.back();
          this.resetForm();
        });
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        accountCode: "",
        supplierCode: "",
        accountTag: "",
        supplierAccountCode: "",
        remark: "",
        keyConfig: ""
      }
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
