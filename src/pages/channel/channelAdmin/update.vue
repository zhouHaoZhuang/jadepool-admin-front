<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item v-if="type === 'add'" label="渠道商名称" prop="name">
          <a-select
            style="width:120px"
            allowClear
            v-model="form.name"
            placeholder="产品名称"
          >
            <a-select-option :value="1">
              Jack
            </a-select-option>
            <a-select-option :value="2">
              TOM
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="type === 'add'" label="资源池产品" prop="prod">
          <a-select
            style="width:120px"
            allowClear
            v-model="form.prod"
            placeholder="产品名称"
          >
            <a-select-option :value="1">
              Jack
            </a-select-option>
            <a-select-option :value="2">
              TOM
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="渠道商名称">
          {{ form.name }}
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="资源池产品">
          {{ form.prod }}
        </a-form-model-item>
        <a-form-model-item label="折扣方式" prop="type">
          <a-radio-group v-model="form.type">
            <a-radio value="1">
              固定价格
            </a-radio>
            <a-radio value="2">
              比例折扣
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-if="form.type === '2'" label="折扣比例" prop="num">
          <a-input
            v-model="form.num"
            v-number-evolution="{ value: 2, min: 0, max: 100 }"
          />
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
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        name: undefined,
        prod: undefined,
        type: "2",
        num: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请选择渠道商名称",
            trigger: "change"
          }
        ],
        prod: [
          {
            required: true,
            message: "请选择资源池产品",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择折扣方式",
            trigger: "change"
          }
        ],
        num: [
          {
            required: true,
            message: "请输入折扣比例",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/channel/index/update") {
          if (newVal.query.id) {
            this.type = "edit";
          } else {
            this.type = "add";
          }
        } else if (newVal.path === "/channel/index/price") {
          this.resetForm();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(valid, this.form);
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
