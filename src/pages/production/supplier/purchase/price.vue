<template>
  <div class="supplier-add">
    <div class="content">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="所属供应商" prop="accountCode">
          <a-select
            v-model="form.supplierCode"
            placeholder="please select your zone"
          >
            <a-select-option value="S20211122000001">
              阿里云
            </a-select-option>
            <a-select-option value="华为云">
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="供应商标识" prop="supplierAccountCode">
          <a-input v-model="form.supplierAccountCode" />
        </a-form-model-item>
        <a-form-model-item label="供应商侧账号ID" prop="accountTag">
          <a-input v-model="form.accountTag" />
        </a-form-model-item>
        <a-form-model-item label="账号配置">
          <a-input v-model="form.keyConfig" type="keyConfig" />
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-input v-model="form.remark" type="remark" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{span:18,offset:6}">
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
      labelCol:{span:6},
      wrapperCol:{span:18},
      other:"",
      form:{
        accountCode:"",
        supplierAccountCode:"",
        accountTag:"",
        keyConfig:"",
        remark:"",
        supplierCode:""
      },
      rules:{
       supplierCode: [
          {
            required: true,
            message: "select",
            trigger: "change"
          }
        ],
        supplierAccountCode:[
          {
            required:true,
            message:"请输入供应商标识",
            trigger:"blur"
          }
        ],
        accountTag:[
          {
            required:true,
            message:"请输入供应商侧账号ID",
            trigger:"blur"
          }
        ]
      },
      loading:false
    };
  },
  methods: {
    // 提交
    onSubmit(){
     this.$refs.ruleForm.validate(valid => {
       console.log(this.form);
        this.$store.dispatch("purchase/add", this.form).then(val => {
          console.log(val);
          this.$message.success("提交成功");
          this.$router.back();
          this.resetForm();
        });
      });
    },
    // 重置
    resetForm(){
      this.$refs.ruleForm.clearValidate();
      this.form = {
        accountCode:"",
        supplierAccountCode:"",
        accountTag:"",
        keyConfig:"",
        remark:"",
        supplierCode:""
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
