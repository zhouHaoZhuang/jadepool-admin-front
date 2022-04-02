<template>
  <div>
    <!-- <a-table :columns="columns" ></a-table> -->
    <h1>基础信息</h1>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="渠道商" prop="name">
        <a-input
          v-model="form.name"
          placeholder="请输入渠道商ID/渠道商名称模糊查询"
        />
      </a-form-model-item>
      <a-form-model-item label="账期">
        <a-month-picker
          placeholder="账期"
          format="YYYY-MM"
          @change="startValue"
        >
        </a-month-picker>
      </a-form-model-item>
      <a-form-model-item label="备注">
        <a-textarea
          v-model="form.name"
          placeholder="请输入备注，不超过100字"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          拉取对账单明细
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <h1>对账单明细</h1>
    <div>
      <a-input v-model="form.name" placeholder="请输入订单号" />
      <a-button type="primary" @click="onSubmit">
        查询
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style></style>
