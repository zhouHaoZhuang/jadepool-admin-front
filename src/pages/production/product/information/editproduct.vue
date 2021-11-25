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
        <a-form-model-item label="资源池产品ID">
          {{ form.id }}
        </a-form-model-item>
        <a-form-model-item label="资源池产品名称" prop="productName">
          <a-input v-model="form.productName" />
        </a-form-model-item>
        <a-form-model-item label="资源池产品CODE" prop="productCode">
          <a-input v-model="form.productCode" />
        </a-form-model-item>
        <!-- <a-form-model-item ref="name" label="供应商" prop="name">
          <a-input v-model="form.SupplierName" />
        </a-form-model-item> -->
        <a-form-model-item label="供应商" prop="supplierName">
          <a-select
            v-model="form.supplierName"
            placeholder="please select your zone"
          >
            <a-select-option value="阿里云">
              阿里云
            </a-select-option>
            <a-select-option value="华为云">
              华为云
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="供应商产品CODE">
          <a-input v-model="form.supplierProductCode" />
        </a-form-model-item>
        <a-form-model-item label="供应商产品Type">
          <a-input v-model="form.supplierProductType" />
        </a-form-model-item>
        <a-form-model-item label="产品经理">
          <a-input v-model="form.pm" />
        </a-form-model-item>
        <a-form-model-item label="备注">
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
        productCode: "",
        supplierName: "",
        supplierProductCode: "",
        supplierProductType: "",
        pm: "",
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
        productCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        supplierName: [
          {
            required: true,
            message: "select",
            trigger: "change"
          }
        ]
      },
      loading: false
    };
  },
  activated() {
    let id = this.$route.query.form;
    this.$store.dispatch("pool/getOne", id).then(res => {
      this.form = res.data;
      console.log(res.data);
    });
    // console.log(form, "********");
  },
  methods: {
    // 提交
    onSubmit() {
      // console.log(this.form, "form");
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log("test", valid, this.form);
          this.$store
            .dispatch("pool/changeList", this.form)
            .then(res => {
              this.$message.success("提交成功");
              console.log(res, "********");
              this.$router.back();
            })
            .catch(err => {
              // console.log(err, "********");
            })
            .finally(() => {
              this.resetForm();
            });
        }
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
