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
        <a-form-model-item label="渠道商" prop="supplierName">
          <a-select
            v-model="form.cusomerCode"
            placeholder="please select your zone"
          >
            <a-select-option
              v-for="v in cutomerList"
              :value="v.cutomerCode"
              :key="v.id"
            >
              {{ v.cutomerName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="采购账号" prop="supplierName">
          <a-select
            v-model="form.accountCode"
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
      //       "accountCode": "string",
      //   "cusomerCode": "string",
      //   "remark": "string"
      form: {
        accountCode: "",
        cusomerCode: "",
        remark: ""
      },
      rules: {
        accountCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        cusomerCode: [
          {
            required: true,
            message: "select",
            trigger: "change"
          }
        ]
      },
      loading: false,
      cutomerList: [],
      purchase: []
    };
  },
  activated() {
    //   获取渠道商
    this.$store.dispatch("channel/getList").then(val => {
      // cutomerName
      console.log(val.data.list);
      this.cutomerList = val.data.list;
    });
    //   获取采购账号
    this.$store.dispatch("purchase/getList").then(val => {
      console.log(val.data.list);
      this.purchase = val.data.list;
    });
  },
  methods: {
    // 提交
    onSubmit() {
          // console.log(this.form,"9999999999999");
      this.$refs.ruleForm.validate(valid => {
        this.$store.dispatch("order/addList", this.form).then(val => {
          console.log(val, "-----");
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
        accountCode: "",
        cusomerCode: "",
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
