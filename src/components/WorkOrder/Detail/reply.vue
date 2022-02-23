<template>
  <div class="work-reply-container">
    <div class="title">回复工单</div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="快捷回复">
        <a-select
          v-model="replyValue"
          allowClear
          placeholder="请选择快捷回复"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in replyList"
            :key="item.id"
            :value="item.context"
          >
            {{ item.context }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="是否私密回复">
        <a-checkbox-group v-model="form.secret">
          <a-checkbox :value="1">
            [私密回复](仅平台客服和云技术客服可见)
          </a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="回复内容" prop="replyDetail">
        <a-input
          v-model="form.replyDetail"
          type="textarea"
          allowClear
          :maxLength="2000"
          placeholder="请输入您的回复内容"
        />
      </a-form-model-item>
      <a-form-model-item label="附件上传">
        <Upload
          :defaultFile="form.replyUrl"
          :limit="5"
          replaceUrl="formService"
          @change="imgChange"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
        <a-button
          type="primary"
          :loading="loading"
          :disabled="detail.status !== 2"
          @click="onSubmit"
        >
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
export default {
  components: {
    Upload
  },
  props: {
    // 工单详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  activated() {
    this.getList();
    this.resetForm();
  },
  data() {
    return {
      listQuery: {
        sorter: "desc",
        currentPage: 1,
        pageSize: 999
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      form: {
        secret: [],
        replyDetail: "",
        replyUrl: []
      },
      rules: {
        replyDetail: [
          {
            required: true,
            message: "请输入回复内容",
            trigger: ["change", "blur"]
          }
        ]
      },
      loading: false,
      replyList: [],
      replyValue: undefined
    };
  },
  methods: {
    // 获取快捷回复列表
    getList() {
      this.$store
        .dispatch("workorder/quickReplyList", this.listQuery)
        .then(res => {
          this.replyList = [...res.data.list].filter(item => item.status === 1);
        });
    },
    // 图片上传
    imgChange({ urlList, firstImageUrl, base64StrObj }) {
      console.log(base64StrObj);
      this.form.replyUrl = [...urlList];
    },
    // 快捷回复change
    handleChange(value) {
      this.form.replyDetail = value;
    },
    // 重置表单
    resetForm() {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
      this.form = {
        secret: [],
        replyDetail: "",
        replyUrl: []
      };
      this.replyValue = undefined;
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const data = {
            ...this.form,
            identityType: 3,
            workOrderNo: this.detail.workOrderNo,
            replyUrl: this.form.replyUrl.toString(),
            secret: this.form.secret.toString() * 1
          };
          this.$store
            .dispatch("workorder/sendMessage", data)
            .then(res => {
              this.$message.success("提交成功");
              this.resetForm();
              this.$emit("success");
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

<style lang="less" scoped>
.work-reply-container {
  padding-bottom: 24px;
  margin-bottom: 18px;
  background: #fff;
  font-size: 12px;
  .title {
    border-bottom: 1px solid #ebebeb;
    padding-left: 32px;
    height: 48px;
    line-height: 48px;
    margin-bottom: 10px;
    text-indent: 0;
    font-size: 14px;
    background-color: #fff;
    color: #292929;
  }
}
</style>
