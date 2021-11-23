<template>
  <div class="addproduct">
    <div class="box-wrap">
      <!-- <a-form-model
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
      </a-form-model> -->
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="资源池产品名称" prop="name">
          <a-input v-model="form.ResourcePoolName" />
        </a-form-model-item>
      <a-form-model-item ref="name" label="资源池产品CODE" prop="name">
          <a-input v-model="form.ResourcePoolCode" />
        </a-form-model-item>
      <a-form-model-item ref="name" label="供应商" prop="name">
          <a-input v-model="form.SupplierName" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="供应商产品CODE" prop="name">
          <a-input v-model="form.SupplierCode" />
        </a-form-model-item>
        <a-form-model-item label="供应商产品Type">
          <a-input v-model="form.SupplierType" />
        </a-form-model-item>
        <!-- <a-form-model-item ref="name" label="供应商产品Type" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item> -->
        <a-form-model-item ref="name" label="产品经理" >
          <a-input v-model="form.pm" />
        </a-form-model-item>
      <a-form-model-item label="备注" prop="desc">
          <a-input v-model="form.Remark" type="textarea" />
        </a-form-model-item>
      <a-button type="primary" @click="onSubmit" :loading="loading">
          提交
        </a-button>
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
        ResourcePoolName: "",
        ResourcePoolCode:'',
        SupplierName:'',
        SupplierCode:'',
        SupplierType:'',
        pm:'',
        web:'',
        Remark:''
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
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

<style scoped lang="less">
.addproduct {
  width: 1220px;
  background-color: #fff;
  > .box-wrap {
    width: 100%;
  }
}
</style>
