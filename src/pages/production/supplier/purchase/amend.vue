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
        <a-form-model-item label="采购账号ID" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="所属供应商" prop="name1">
          <a-input v-model="form.name1" />
        </a-form-model-item>
        <a-form-model-item label="供应商标识" prop="web">
          <a-input v-model="form.web" />
        </a-form-model-item>
        <a-form-model-item label="供应商侧账号ID" prop="user">
          <a-input v-model="form.user" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="账号配置">
          <a-input v-model="form.desc" type="textarea" />
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
  name: "index",
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: "",
      form: {
        name: "",
        name1: "",
        web: "",
        user: "",
        phone: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入采购账号ID",
            trigger: "blur"
          }
        ],
        name1: [
          {
            required: true,
            message: "请输入所属供应商",
            trigger: "blur"
          }
        ],
        web: [
          {
            required: true,
            message: "请输入供应商标识",
            trigger: "blur"
          }
        ],
        user: [
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
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(valid, this.form);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
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
