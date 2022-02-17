<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="移动工单"
    wrapClassName="move-work-container"
    okText="确认移交"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="工单分类">
        {{ detail.questionCategoryName }}
      </a-form-model-item>
      <a-form-model-item label="指定工作人员">
        <a-select
          v-model="form.receiverUser"
          allowClear
          placeholder="请选择指定工作人员"
        >
          <a-select-option :value="-1">
            不指定
          </a-select-option>
          <a-select-option
            v-for="item in userList"
            :key="item.userCode"
            :value="item.userCode"
          >
            {{ item.nickname }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="备注说明">
        <a-input
          v-model="form.description"
          type="textarea"
          allowClear
          placeholder="请输入备注说明"
        />
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
        } else {
          this.getUserList();
        }
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        sort: undefined,
        description: ""
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
        context: "",
        sort: 0,
        description: ""
      };
    },
    // 获取工作人员列表
    getUserList() {
      this.$store.dispatch("workorder/workOrderUserList").then(res => {
        this.userList = [...res.data];
      });
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const data = {
            ...this.form,
            workOrderNo: this.detail.workOrderNo,
            status: this.detail.status,
            receiverType: 1,
            receiverUser:
              this.form.receiverUser * 1 === -1
                ? undefined
                : this.form.receiverUser
          };
          this.$store
            .dispatch("workorder/moveWorkOrder", data)
            .then(res => {
              this.$message.success("移动工单成功");
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
