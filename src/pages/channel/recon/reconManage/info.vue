<template>
  <div class="add-reconManage">
    <a-descriptions title="基础信息" style="margin-bottom:20px">
      <a-descriptions-item label="对账单号">
        DZ2100000210
      </a-descriptions-item>
      <a-descriptions-item label="渠道商">
        浙江曙云科技有限公司
      </a-descriptions-item>
      <a-descriptions-item label="账期">
        2022-02
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        确认
      </a-descriptions-item>
      <a-descriptions-item label="开票状态">
        未开票
      </a-descriptions-item>
      <a-descriptions-item label="最后更新人">
        浙江云盾科技有限公司
      </a-descriptions-item>
      <a-descriptions-item label="最后更新时间">
        2022-03-01 00:00:00
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        测试
      </a-descriptions-item>
    </a-descriptions>
    <div style="margin-bottom:20px">
      <span class="title-table">对账单明细</span>
      <a-button size="small" style="margin-left:20px" type="primary">
        导出对账单明细
      </a-button>
    </div>
    <div style="margin-bottom:10px">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input v-model="listQuery.orderNo" placeholder="请输入订单号" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getList">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :pagination="paginationProps"
        rowKey="id"
        :columns="columns"
        :data-source="data"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
      </a-table>
      <b>
        账单拉取总金额：
        <span>¥ 2233.00</span>
        可开票拉取总金额：
        <span>
          ¥ 2233
        </span>
      </b>
    </div>
    <!-- 新增建议调整项 窗口 -->
    <a-modal
      title="添加建议调整项"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
    >
      <a-form-model
        ref="ruleForm"
        :model="formRevision"
        :rules="rulesRevision"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="订单号" prop="name">
          <a-input placeholder="请输入订单号" v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="产品">
          <span>根据订单号带出</span>
        </a-form-model-item>
        <a-form-model-item label="订单金额（元）">
          <span>根据订单号带出</span>
        </a-form-model-item>
        <a-form-model-item label="可开票金额（元）">
          <span>根据订单号带出</span>
        </a-form-model-item>
        <a-form-model-item label="订单调整金额（元）" prop="name">
          <a-input placeholder="请输入金额（正或负数）" v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="可开票调整金额（元）" prop="name">
          <a-input placeholder="请输入金额（正或负数）" v-model="form.name" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-descriptions style="margin-top:30px" title="调整单明细">
    </a-descriptions>
    <b>建议调整项</b>
    <div>
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input
            v-model="actualListQuery.orderNo"
            placeholder="请输入订单号"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :pagination="actualPaginationProps"
        rowKey="id"
        :columns="actualColumns"
        :data-source="actualData"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">删除</a-button>
        </div>
      </a-table>
      <b>
        建议账单调整总金额：
        <span>¥ 2233.00</span>
        建议可开票调整总金额：
        <span>
          ¥ 2233
        </span>
      </b>
    </div>
    <b style="display: block;margin-top:20px">实际调整项</b>
    <div>
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input v-model="form.name" placeholder="请输入订单号" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :pagination="recomPaginationProps"
        rowKey="id"
        :columns="actualColumns"
        :data-source="recomData"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">删除</a-button>
        </div>
      </a-table>
      <b>
        实际账单调整总金额：
        <span>¥ 2233.00</span>
        实际可开票调整总金额：
        <span>
          ¥ 2233
        </span>
      </b>
    </div>
    <div>
      <a-descriptions style="margin-top:30px">
        <div slot="title">
          对账单总金额：
          <span>¥ 2213.00</span>
          可开票总金额：
          <span>¥ 2213.00</span>
        </div>
      </a-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: null, //详情描述数据
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRevision: {
        name: ""
      },
      rulesRevision: {
        name: [
          {
            required: true,
            message: "当前选项不能为空",
            trigger: "blur"
          }
        ]
      },
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
      },
      data: [],
      columns: [
        {
          title: "订单号",
          dataIndex: "companyName",
          key: "companyName"
        },
        {
          title: "类型",
          dataIndex: "createTime",
          key: "createTime"
        },
        {
          title: "产品",
          dataIndex: "invoiceNo",
          key: "invoiceNo"
        },
        {
          title: "订单创建时间",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "订单金额（元）",
          dataIndex: "damount",
          key: "amount"
        },
        {
          title: "可开票金额（元）",
          dataIndex: "kamount"
        }
      ],
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        orderNo: ""
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
      },
      actualListQuery: {
        orderNo: "",
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: ""
      },
      actualPaginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${
            this.actualListQuery.currentPage
          } / ${Math.ceil(total / this.actualListQuery.pageSize)} 页`,
        onChange: this.quickJumpActual,
        onShowSizeChange: this.onShowSizeChangeActual
      },
      actualData: [],
      actualColumns: [
        {
          title: "订单号",
          dataIndex: "companyName",
          key: "companyName"
        },
        {
          title: "类型",
          dataIndex: "createTime",
          key: "createTime"
        },
        {
          title: "产品",
          dataIndex: "invoiceNo",
          key: "invoiceNo"
        },
        {
          title: "订单创建时间",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "原订单金额（元）",
          dataIndex: "damount",
          key: "amount"
        },
        {
          title: "原可开票金额（元）",
          dataIndex: "ykamount"
        },
        {
          title: "订单调整金额（元）",
          dataIndex: "orderamount"
        },
        {
          title: "可开票调整金额（元）",
          dataIndex: "kkamount"
        },
        {
          title: "调整后订单金额（元）",
          dataIndex: "tzkamount"
        },
        {
          title: "调整后可开票金额（元）",
          dataIndex: "kamount"
        }
      ],
      recomListQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        orderNo: ""
      },
      recomData: [],
      recomPaginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.recomListQuery.currentPage} / ${Math.ceil(
            total / this.recomListQuery.pageSize
          )} 页`,
        onChange: this.quickJumpRecom,
        onShowSizeChange: this.onShowSizeChangeRecom
      },
    };
  },
  methods: {
    // 获取详情数据
    getData() {
      this.$store.dispatch("recon/getOneRecon", { id: this.$route.query.id }).then(res => {
        this.dataInfo = res.data;
      });
    },
    showModal() {
      this.visible = true;
    },
    // 确认添加
    handleOk(e) {
      this.confirmLoading = true;
      this.onSubmitAdd();
    },
    // 取消（关闭弹窗）
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    // 添加建议调整项Add
    onSubmitAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.$store
          //   .dispatch("reconciliation/addSteerItem", this.form)
          //   .then(() => {
          //     this.confirmLoading = false;
          //     this.visible = false;
          //     this.$message.success("添加成功");
          //   });
        }
      });
    },

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
    },
    //查询对账单明细列表
    getList() {
      this.$store.dispatch("recon/getReconDetail", this.listQuery).then(res => {
        console.log(res);
        this.actualCata = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    //查询数据表格(建议)
    getActualList() {
      this.$getList("recon/getActualList", this.actualListQuery).then(res => {
        console.log(res);
        this.actualData = [...res.data.list];
        this.actualPaginationProps.total = res.data.totalCount * 1;
      });
    },
    // 获取实际对账单列表
    getRecomDataList(){
      this.$getList("recon/getRecomDataList", this.recomListQuery).then(res => {
        console.log(res);
        this.recomData = [...res.data.list];
        this.recomPaginationProps.total = res.data.totalCount * 1;
      });
    },
    quickJumpRecom(currentPage) {
      this.recomListQuery.currentPage = currentPage;
      this.getRecomDataList();
    },
    onShowSizeChangeRecom(current, pageSize) {
      this.recomListQuery.currentPage = current;
      this.recomListQuery.pageSize = pageSize;
      this.getRecomDataList();
    },
    //表格分页跳转
    quickJumpActual(currentPage) {
      this.actualListQuery.currentPage = currentPage;
      this.getActualList();
    },
    //表格分页切换每页条数
    onShowSizeChangeActual(current, pageSize) {
      this.actualListQuery.currentPage = current;
      this.actualListQuery.pageSize = pageSize;
      this.getActualList();
    }
  }
};
</script>

<style lang="less" scoped>
.add-reconManage {
  padding: 20px;
  margin: 0 20px;
  background-color: #fff;
}
.bottom-button {
  text-align: center;
}
.title-table {
  margin-bottom: 20px;
  color: #000000d9;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
}
</style>
