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
        <a-form-model-item label="所属供应商" prop="supplierCode">
          <a-select
            v-model="form.supplierCode"
            placeholder="请选择所属供应商"
            @change="handleChange"
          >
            <a-select-option
              v-for="item in supplierList"
              :key="item.supplierCode"
              :value="item.supplierCode"
            >
              {{ item.supplierName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- <a-form-model-item label="供应商标识" prop="supplierAccountCode">
          <a-input v-model="form.supplierAccountCode" />
        </a-form-model-item> -->
        <a-form-model-item label="账号标识" prop="accountTag">
          <a-input v-model="form.accountTag" />
        </a-form-model-item>
        <a-form-model-item label="账号配置" prop="keyConfig">
          <a-input v-model="form.keyConfig" type="keyConfig" />
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-input v-model="form.remark" type="remark" />
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
      supplierList: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: "",
      form: {
        accountCode: "",
        supplierAccountCode: "",
        accountTag: "",
        keyConfig: "",
        remark: "",
        supplierCode: ""
      },
      rules: {
        supplierCode: [
          {
            required: true,
            message: "请输入所属供应商",
            trigger: "change"
          }
        ],
        supplierAccountCode: [
          {
            required: true,
            message: "请输入供应商标识",
            trigger: "blur"
          }
        ],
        accountTag: [
          {
            required: true,
            message: "请输入供应商侧账号ID",
            trigger: "blur"
          }
        ],
        keyConfig: [
          {
            required: true,
            message: "请输入账号配置",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 999
      }
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      this.$getListQp("provider/getList", this.listQuery).then(res => {
        console.log(res);
        this.supplierList = res.data.list;
      });
    },
    handleChange(value, obj) {
      this.form.supplierAccountCode = obj.componentOptions.children[0].text.trim();
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const obj = JSON.parse(this.form.keyConfig);
          if (typeof obj == "object" && JSON.stringify(obj) !== "{}") {
            this.$store
              .dispatch("purchase/add", {
                ...this.form,
                keyConfig: obj
              })
              .then(val => {
                console.log(val);
                this.$message.success("提交成功");
                this.$router.back();
                this.resetForm();
              });
          } else {
            this.$message.warning("账号配置格式不正确");
          }
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        accountCode: "",
        supplierAccountCode: "",
        accountTag: "",
        keyConfig: "",
        remark: "",
        supplierCode: ""
      };
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
