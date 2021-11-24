<template>
  <div class="supplier-add">
    <div class="content">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
         <a-form-model-item label="供应商ID">
          {{ form.id }}
        </a-form-model-item>
        <a-form-model-item label="供应商全名称" prop="supplierName">
          <a-input v-model="form.supplierName" />
        </a-form-model-item>
        <a-form-model-item label="简称" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="网址">
          <a-input v-model="form.url" />
        </a-form-model-item>
        <a-form-model-item label="联系人">
          <a-input v-model="form.contacts" />
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="form.number" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.description" type="textarea" />
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
  data() {
    return {
      detail:{},
      labelCol:{span:6},
      wrapperCol:{span:18},
      other:"",
      form:{
        id:"",
        supplierName:"",
        shortName:"",
        url:"",
        contacts:"",
        number:"",
        description:""
      },
      rules:{
        name:[
          {
            required:true,
            message:"请输入供应商全称",
            trigger:"blur"
          }
        ],
        name1:[
          {
            required:true,
            message:"请输入简称",
            trigger:"blur"
          }
        ]
      },
      loading:false
    };
  },
  activated(){
    let id = this.$route.query.id;
    this.$store.dispatch("provider/getId", id).then(res => {
    this.form = res.data
    });
  },
  methods: {
    onSubmit(){
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          console.log(valid, this.form);
        }
      })
    },
    resetForm(){
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
