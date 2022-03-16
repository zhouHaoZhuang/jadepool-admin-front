<template>
  <div class="bill-select">
    <div class="bill-info">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          FP20220314001
        </a-descriptions-item>
        <a-descriptions-item label="渠道商名称"> 上海XX公司 </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          增值税专用发票
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          上海XX公司
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          91000000000
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          <b>￥500.00</b>
        </a-descriptions-item>
        <a-descriptions-item label="申请状态"> 已提交 </a-descriptions-item>
        <a-descriptions-item label="申请时间">
          2016-09-21 08:50:08
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="收件人信息">
        <a-descriptions-item label="收件人"> 王富贵 </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          15200000000000
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          上海市/浦东区/陆家嘴
        </a-descriptions-item>
        <a-descriptions-item label="详细地址">上海 虹桥</a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">订单信息</h2>
      <a-table :columns="columns" :data-source="data"> </a-table>
    </div>
    <div>
      <h2 style="margin: 20px 0">审核反馈</h2>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="反馈说明" prop="name">
          <a-input v-model="form.name" placeholder="如果驳回请输入驳回原因" />
        </a-form-model-item>
        <a-form-model-item label="物流单号">
          <a-input />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            审核通过
          </a-button>
          <a-button type="danger" style="margin-left: 10px;" @click="resetForm">
            审核驳回
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
      data: [],
      columns: [
        {
          title: "资源池订单ID",
          dataIndex: "orderId"
        },
        {
          title: "云商城订单ID",
          dataIndex: "yunorderId"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "客户名称",
          dataIndex: "customerName"
        },
        {
          title: "可开票金额",
          dataIndex: "canInvoiceAmount"
        },
        {
          title: "创建时间",
          dataIndex: "orderCreateTime"
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
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
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.bill-select {
  width: 100%;
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
.bill-info {
  margin: 30px 0;
}
</style>
