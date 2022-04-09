<template>
  <a-modal
    :visible="value"
    width="760px"
    centered
    title="选择新客服"
    wrapClassName="add-domain-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model layout="inline" :model="listQuery">
      <a-form-model-item>
        <a-input v-model="listQuery.name" placeholder="请输入客服姓名" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="listQuery.phone" placeholder="请输入联系方式" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="getCustomerList"> 查询 </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
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
    newAdvocateList: {},
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          //调用获取列表数据的接口
          this.$nextTick(() => {
            this.data = this.newAdvocateList;
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
      form: {
        domain: "",
      },
      listQuery: {
        name: undefined,
        phone: undefined,
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      selectData: [],
      columns: [
        {
          title: "客服姓名",
          dataIndex: "name",
        },
        {
          title: "联系方式",
          dataIndex: "phone",
        },
      ],
      rules: {
        domain: [
          {
            required: true,
            message: "请输入域名",
            tigger: ["blur", "change"],
          },
        ],
      },
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
      this.searchClick();
    },
    onShowSizeChange(current, pageSize) {
      this.paginationProps.pageSize = pageSize;
      this.paginationProps.current = current;
      this.searchClick();
    },
    getCustomerList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store.dispatch("customer/getList", this.listQuery).then((res) => {
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
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
      this.$emit("filterNewCustomer", this.selectData, this.selectedRowKeys);
    },
  },
};
</script>
<style lang="less" scoped></style>