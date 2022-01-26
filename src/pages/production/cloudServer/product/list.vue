<template>
  <div class="addproduct">
    <div class="box-wrap">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="productName" label="供应商" prop="productName">
          <span>阿里云</span>
        </a-form-model-item>
        <a-form-model-item
          ref="productName"
          label="产品代码"
          prop="productName"
        >
          <span>ddos</span>
        </a-form-model-item>
        <a-form-model-item
          ref="productName"
          label="产品类型"
          prop="productName"
        >
          <span>ddos_gamesecuritybox_public_cn</span>
        </a-form-model-item>
        <a-form-model-item label="描述" ref="remark">
          <a-input v-model="form.remark" type="textarea" />
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
        productName: "",
        accountCode: "",
        supplierProductCode: "",
        supplierProductType: "",
        remark: ""
      },
      rules: {
        productName: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        accountCode: [
          {
            required: true,
            message: "select",
            trigger: "change"
          }
        ]
      },
      loading: false,
      purchase: []
    };
  },
  activated() {
    //   获取采购账号
    this.$store.dispatch("purchase/getList").then(val => {
      console.log(val.data.list);
      this.purchase = val.data.list;
    });
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        this.$store.dispatch("pool/addList", this.form).then(val => {
          console.log(val);
          this.$message.success("提交成功");

          this.$router.back();
          this.resetForm();
        });
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        productName: "",
        productCode: "",
        supplierName: "",
        supplierProductCode: "",
        supplierProductType: "",
        pm: "",
        remark: ""
      };
    }
  }
};
</script>

<style scoped lang="less">
.addproduct {
  width: 1220px;
  background-color: #fff;
  margin: 0 24px;
  padding: 20px;
  height: 615px;
  > .box-wrap {
    width: 600px;
    margin: 0 auto;
    // text-align: center;
    background-color: #fff;
    button {
      position: relative;
      left: 150px;
    }
  }
}
</style>
