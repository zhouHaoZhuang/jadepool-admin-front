<template>
  <a-modal
    :visible="value"
    width="760px"
    centered
    title="选择客户"
    wrapClassName="add-domain-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model layout="inline" :model="listQuery">
      <a-form-model-item>
        <a-input
          v-model="listQuery.name"
          allow-clear
          placeholder="请输入姓名"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="listQuery.companyName"
          allow-clear
          placeholder="请输入企业"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-input
          v-model="listQuery.phone"
          allow-clear
          placeholder="请输入手机号"
        />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="getList"> 查询 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="corporationCode"
      :pagination="paginationProps"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
    </a-table>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value",
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false,
    },
    //客服id
    advocateList: {},
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          //调用获取列表数据的接口
          this.listQuery.id = this.advocateList;
          this.$nextTick(() => {
            this.getList();
          });
        }
      },
    },
  },
  data() {
    return {
      labelCol: { span: 15 },
      wrapperCol: { span: 6 },
      loading: false,
      domainReg: "",
      data: [],
      selectedRowKeys: [],
      selectData: [],
      throwData: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        name: undefined,
        phone: undefined,
        companyName: undefined,
        id: undefined,
      },
      columns: [
        {
          title: "用户ID",
          dataIndex: "corporationCode",
        },
        {
          title: "姓名",
          dataIndex: "realName",
        },
        {
          title: "企业",
          dataIndex: "companyName",
        },
        {
          title: "手机号",
          dataIndex: "phoneNumber",
        },
      ],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange,
      },
    };
  },
  methods: {
    changepage(current) {
      this.paginationProps.current = current;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.paginationProps.pageSize = pageSize;
      this.paginationProps.current = current;
      this.getList();
    },
    getList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch("customer/getCustomerList", this.listQuery)
        .then((res) => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {});
    },
    onSelectChange(selectedRowKeys, data) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectData = data;
    },
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
    },
    // 弹窗提交
    handleOk() {
      console.log("我是客户提交的值", this.selectData, this.selectedRowKeys);
      this.$emit("selectData", this.selectData, this.selectedRowKeys);
    },
  },
};
</script>
<style lang="less" scoped>
.ant-form-item {
  width: 150px !important;
}
</style>







