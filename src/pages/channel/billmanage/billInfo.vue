<template>
  <div class="bill-select">
    <div class="bill-info" v-if="data">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          {{ data.invoiceNo }}
        </a-descriptions-item>
        <a-descriptions-item label="渠道商名称">
          {{ data.invoiceInfo.createUserName }}
        </a-descriptions-item>
        <a-descriptions-item label="发票类型">
          {{ issueTypeMap[data.invoiceInfo.issueType] }}
        </a-descriptions-item>
        <!-- <a-descriptions-item label="发票类型">
          {{ invoiceTypeMap[data.invoiceInfo.invoiceType] }}
        </a-descriptions-item> -->
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
        <a-descriptions-item label="申请时间">
          {{ data.createTimeShow }}
        </a-descriptions-item>
        <a-descriptions-item label="反馈时间">
          <span>
            {{ data.feedbackTimeShow }}
          </span>
        </a-descriptions-item>
        <a-descriptions-item label="反馈说明">
          <span v-if="data.status === 4">
            {{ data.rejectRemark }}
          </span>
          <span v-if="data.status === 5">
            {{ data.feedbackRemark }}
          </span>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions style="margin: 20px 0" title="物流信息">
        <a-descriptions-item label="收件人">
          {{ data.addressInfo.addressee }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ data.addressInfo.concatPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          {{ data.addressInfo.province }}/ {{ data.addressInfo.city }}/
          {{ data.addressInfo.county }}
        </a-descriptions-item>
        <a-descriptions-item label="详细地址">
          {{ data.addressInfo.address }}
        </a-descriptions-item>
        <a-descriptions-item label="物流单号">
          {{ data.expressDelivery }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票列表</h2>
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
        <div slot="action" slot-scope="text, record">
          <a-button type="link" @click="record">
            详情
          </a-button>
        </div>
      </a-table>
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
          title: "对账单号",
          dataIndex: "orderNo"
        },
        {
          title: "账期",
          dataIndex: "productName"
        },
        {
          title: "账单总金额（元）",
          dataIndex: "orderAmount"
        },
        {
          title: "可开票总金额（元）",
          dataIndex: "originalAmountShow"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
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
    this.getDetail();
  },
  methods: {
    // 获取详情数据
    getDetail() {
      this.$store
        .dispatch("billmangage/getDetail", {
          id: this.$route.query.id
        })
        .then(res => {
          console.log(res, "-------");
          this.data = res.data;
          this.dataList = res.data.invoiceEvaluatePage.list;
          this.paginationProps.total =
            res.data.invoiceEvaluatePage.totalCount * 1;
        });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getDetail();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getDetail();
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
