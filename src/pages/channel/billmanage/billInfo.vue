<template>
  <div class="bill-select">
    <div class="bill-info">
      <a-descriptions style="margin: 20px 0" title="申请信息">
        <a-descriptions-item label="发票ID">
          FP20220314001
        </a-descriptions-item>
        <a-descriptions-item label="客户名称"> 上海XX公司 </a-descriptions-item>
        <a-descriptions-item label="开具类型">
          企业
        </a-descriptions-item>
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
        <a-descriptions-item label="反馈时间">
          2016-09-21 08:50:08
        </a-descriptions-item>
        <a-descriptions-item label="反馈说明">
          阿萨德hasla
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
        <a-descriptions-item label="物流单号">
          910004565465465
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div>
      <h2 style="margin: 20px 0">开票明细</h2>
      <a-table :columns="columns" :data-source="data"> </a-table>
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
          title: "订单ID",
          dataIndex: "orderId"
        },
        {
          title: "产品名称",
          dataIndex: "productName"
        },
        {
          title: "可开票金额",
          dataIndex: "canInvoiceAmount"
        },
        {
          title: "订单创建时间",
          dataIndex: "orderCreateTime"
        }
      ]
    };
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
