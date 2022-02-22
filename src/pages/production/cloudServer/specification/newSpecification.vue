<template>
  <div class="new-specification">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="规格族名称" prop="customTypeFamily">
        <a-input v-model="form.customTypeFamily" />
      </a-form-model-item>
      <a-form-model-item label="规格族CODE" prop="typeFamily">
        <a-input v-model="form.typeFamily" />
      </a-form-model-item>
      <a-form-model-item label="状态" v-if="$route.query.id">
        <a-radio-group v-model="form.status">
          <a-radio :value="1">
            开启
          </a-radio>
          <a-radio :value="0">
            关闭
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="备注">
        <a-textarea
          v-model="form.description"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 7 }">
        <a-button type="primary" @click="onSubmit" :loading="buttonLoading">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 8 },
      buttonLoading: false,
      form: {
        customTypeFamily: "",
        typeFamily: "",
        description: "",
        status: "1"
      },
      rules: {
        customTypeFamily: {
          required: true,
          message: "规格族名称不能为空",
          trigger: "blur"
        },
        typeFamily: {
          required: true,
          message: "规格族CODE名称不能为空",
          trigger: "blur"
        }
      }
    };
  },
  activated() {
    this.resetForm();
    if (this.$route.query.id) {
      console.log(this.$route.query.id, "-------");
      this.getInfo();
    }
  },
  methods: {
    onSubmit() {
      this.buttonLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.$route.query.id) {
            this.changeInfo();
            return;
          }
          this.form.origin = "ali";
          this.form.typeFamilyAlias = this.form.typeFamily;
          this.$store.dispatch("specification/addItem", this.form).then(res => {
            this.$message.success("新增成功");
            this.buttonLoading = false;
            this.$router.back();
          });
        }
      });
    },
    // 获取详情
    getInfo() {
      this.$store
        .dispatch("specification/getListas", this.$route.query.id)
        .then(res => {
          //   console.log(res, "-------");
          this.form = res.data;
        });
    },
    // 修改
    changeInfo() {
      this.$store.dispatch("specification/changeItem", this.form).then(res => {
        // console.log(res, "-------");
        this.buttonLoading = false;
        this.$message.success("修改成功");
        this.$router.back();
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        customTypeFamily: "",
        typeFamily: "",
        description: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.new-specification {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
