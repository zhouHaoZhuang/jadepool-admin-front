<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="渠道商全称" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="简称" prop="name1">
          <a-input v-model="form.name1" />
        </a-form-model-item>
        <a-form-model-item label="项目地址">
          <a-input v-model="form.web" />
        </a-form-model-item>
        <a-form-model-item label="联系人">
          <a-input v-model="form.user" />
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="描述">
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
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
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
            message: "请输入渠道商全称",
            trigger: "blur"
          }
        ],
        name1: [
          {
            required: true,
            message: "请输入简称",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(valid, this.form);
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
