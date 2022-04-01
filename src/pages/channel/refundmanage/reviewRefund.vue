<template>
  <div class="bill-select">
    <div class="bill-info" v-if="data">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          {{ data.invoiceNo }}
        </a-descriptions-item>
        <a-descriptions-item label="客户名称">
          {{ data.invoiceInfo.createUserName }}
        </a-descriptions-item>
        <a-descriptions-item label="开具类型">
          {{ issueTypeMap[data.invoiceInfo.issueType] }}
        </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          {{ invoiceTypeMap[data.invoiceInfo.invoiceType] }}
        </a-descriptions-item>
        <a-descriptions-item label="发票抬头">
          {{ data.invoiceInfo.invoiceTitle }}
        </a-descriptions-item>
        <a-descriptions-item label="税务登记号">
          {{ data.invoiceInfo.registerNo }}
        </a-descriptions-item>
        <a-descriptions-item label="开票金额">
          <b>￥{{ data.invoiceAmount }}</b>
        </a-descriptions-item>
        <a-descriptions-item label="状态">
          {{ invoiceStatusEnum[data.status] }}
        </a-descriptions-item>
        <a-descriptions-item label="退票申请创建时间">
          {{ data.refundCreateTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          {{ data.refundRemark }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="收件人信息">
        <a-descriptions-item label="物流单号">
          {{ data.expressDelivery }}
        </a-descriptions-item>
        <a-descriptions-item label="寄件联系人">
          {{ data.sender }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ data.senderPhone }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票明细</h2>
      <a-table
        :columns="columns"
        :data-source="dataList"
        :pagination="false"
        rowKey="id"
      >
        <div slot="canInvoiceAmount" slot-scope="text, record">
          <span v-if="record.consumptionType === 2">
            {{ record.debtAmount }}
          </span>
          <span v-if="record.consumptionType === 1">
            {{ record.canInvoiceAmount }}
          </span>
        </div>
        <div v-if="text" slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
      </a-table>
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
        <a-form-model-item label="反馈说明" prop="feedbackRemark ">
          <a-input v-model="form.feedbackRemark" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            确认
          </a-button>
          <a-button type="danger" style="margin-left: 10px;" @click="reject">
            拒绝
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum } from "@/utils/enum";

export default {
  data() {
    return {
      data: null,
      invoiceStatusEnum,
      dataList: [],
      issueTypeMap: {
        1: "个人",
        2: "企业"
      },
      invoiceTypeMap: {
        1: "增值税普通发票",
        2: "增值税专用发票"
      },
      columns: [
        {
          title: "订单ID",
          dataIndex: "orderNo"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "开票金额",
          dataIndex: "originalAmountShow"
        },
        {
          title: "订单创建时间",
          dataIndex: "createTimeShow"
        }
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        feedbackRemark: ""
      },
      rules: {
        feedbackRemark: [
          {
            required: true,
            message: "请输入反馈说明"
          }
        ]
      },
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: ""
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  activated() {
    // this.getData();
    this.$nextTick(() => {
      this.resetForm();
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("refundmangage/audit", {
              id: this.$route.query.id,
              ...this.form
            })
            .then(() => {
              this.$message.success("操作成功");
              this.resetForm();
              this.$router.back();
            });
        }
      });
    },
    reject() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("refundmangage/refuse", {
              id: this.$route.query.id,
              ...this.form
            })
            .then(() => {
              this.$message.success("操作成功");
              this.resetForm();
              this.$router.back();
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //查询数据表格
    getData() {
      this.$store
        .dispatch("refundmangage/getDetail", { id: this.$route.query.id })
        .then(res => {
          this.data = res.data;
          this.dataList = res.data.invoiceEvaluatePage.list;
          this.paginationProps.total =
            res.data.invoiceEvaluatePage.totalCount * 1;
        });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      // this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      // this.getList();
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
