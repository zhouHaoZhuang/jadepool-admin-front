<template>
  <div>
    <a-modal
      :title="newTitle"
      width="650px"
      :visible="visibleDetail"
      :confirm-loading="confirmLoading"
      cancelText="关闭"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="申请单号" prop="name">
          {{ form.name }}
        </a-form-model-item>
        <a-form-item label="银行名称" prop="date1">
          {{ form.date1 }}
        </a-form-item>
        <a-form-item label="银行卡号" prop="card">
          {{ form.card }}
        </a-form-item>
        <a-form-item label="银行绑定人" prop="accountName">
          {{ form.accountName }}
        </a-form-item>
        <a-form-item label="提现金额" prop="account">
          {{ form.account }}
        </a-form-item>
        <a-form-item label="状态" prop="status">
          {{ form.status }}
        </a-form-item>
        <a-form-item label="备注" prop="message">
          {{ form.message }}
        </a-form-item>
        <a-form-item label="反馈信息" prop="desc">
          <a-input
            v-if="title == 2"
            v-model="form.desc"
            placeholder="请填写驳回原因"
            type="textarea"
          />
          <a-input
            v-if="title == 3"
            v-model="form.desc"
            placeholder="请填写银行付款单号"
            type="textarea"
          />
          <span v-else> {{ form.desc }}</span>
        </a-form-item>
      </a-form-model>

      <template slot="footer">
        <a-button @click="handleOk" v-if="title == 3" type="primary"
          >确定</a-button
        >
        <a-button type="danger" @click="handleReject" v-if="title == 2"
          >驳回</a-button
        >
        <a-button @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  model: {
    event: "changeVisible",
    prop: "visibleDetail"
  },
  props: {
    // 是否显示弹框
    visibleDetail: {},
    //1 采购-财务管理下的提现申请详情  2 销售-财务管理-提现管理-提现操作
    type: {},
    // 申请提现详情信息
    detailData: {
      type: Object,
      default: () => {}
    },
    //标题
    title: {}
  },
  watch: {
    visibleDetail: {
      handler(newVal) {},
      immediate: true
    },
    title: {
      handler(newVal) {
        //  1 : 提现申请详情 , 2:驳回提现申请 , 3:确认提现申请
        if (newVal == 1) {
          this.newTitle = "提现申请详情";
        } else if (newVal == 2) {
          this.newTitle = "驳回提现申请";
        } else if (newVal == 3) {
          this.newTitle = "确认提现申请";
        }
        console.log(newVal, "newVal11");
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      confirmLoading: false,
      newTitle: "",
      form: {
        name: "haha",
        date1: "啥也不是",
        desc: "",
        card: "",
        account: "",
        accountName: ""
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      rules: {
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //确定申请
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //驳回申请
    handleReject() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 取消弹框
    handleCancel(e) {
      this.$emit("changeVisible", false);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  display: flex;
}
</style>
