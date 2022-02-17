<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="转移到云技术客服"
    wrapClassName="move-cloud-container"
    okText="确认转移此工单？"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="转移到" prop="receiverType">
        <a-select v-model="form.receiverType" allowClear placeholder="请选择">
          <a-select-option :value="2">
            资源池
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    },
    // 工单详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        receiverType: undefined
      },
      rules: {
        receiverType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      loading: false,
      userList: []
    };
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        sort: undefined
      };
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const data = {
            ...this.form,
            workOrderNo: this.detail.workOrderNo,
            status: this.detail.status
          };
          this.$store
            .dispatch("workorder/moveWorkOrder", data)
            .then(res => {
              this.$message.success("转移到云技术客服成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
