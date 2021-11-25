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
        <a-form-model-item
          ref="productName"
          label="资源池产品名称"
          prop="productName"
        >
          <a-input v-model="form.productName" />
        </a-form-model-item>
        <a-form-model-item
          ref="productCode"
          label="资源池产品CODE"
          prop="productCode"
        >
          <a-input v-model="form.productCode" />
        </a-form-model-item>
        <a-form-model-item label="供应商" prop="supplierName">
          <a-select
            v-model="form.supplierName"
            placeholder="please select your zone"
          >
            <a-select-option
              v-for="v in supplierNameList"
              :value="v.supplierName"
              :key="v.id"
            >
              {{ v.supplierName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="supplierProductCode" label="供应商产品CODE">
          <a-input v-model="form.supplierProductCode" />
        </a-form-model-item>
        <a-form-model-item ref="supplierProductType" label="供应商产品Type">
          <a-input v-model="form.supplierProductType" />
        </a-form-model-item>
        <a-form-model-item label="默认采购账号" prop="defaultPurchaseAccount">
          <a-select
            v-model="form.defaultPurchaseAccount"
            placeholder="please select your zone"
          >
            <a-select-option
              v-for="v in purchase"
              :value="v.accountCode"
              :key="v.id"
            >
              {{ v.accountTag }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item ref="pm" label="产品经理">
          <a-input v-model="form.pm" />
        </a-form-model-item>
        <a-form-model-item label="备注" ref="remark">
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
        productName: "",    //产品名称
        defaultPurchaseAccount: "",     //默认采购账号
        productCode: "",      //产品CODE
        supplierName: "",       //供应商
        supplierProductCode: "",    //供应商产品CODE
        supplierProductType: "",    //供应商产品Type
        pm: "",            //产品经理
        remark: ""      //备注
      },
      rules: {
        productName: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        defaultPurchaseAccount: [
          {
            required: true,
            message: "select",
            trigger: "change"
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
      loading: false,
      supplierNameList: [],
      purchase:[]
    };
  },
  activated() {
    // 此处需要获取供应商列表
    this.$store.dispatch("provider/getList").then(res => {
      this.supplierNameList = res.data.list;
    });
    // 此处需要获取默认采购账号列表
    this.$store.dispatch("purchase/getList").then(val => {
      // console.log(val.data.list);
      this.purchase = val.data.list;
    });
  },
  methods: {
    // 提交
    onSubmit() {
      console.log(this.form);
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
      this.$refs.ruleForm.resetFields();
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
