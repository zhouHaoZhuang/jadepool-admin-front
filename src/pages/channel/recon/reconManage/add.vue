<template>
  <div class="add-reconManage">
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
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input v-model="form.name" placeholder="请输入订单号" />
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
        <div slot="action">
          <a-button type="link" @click="showModal">调整</a-button>
        </div>
      </a-table>
      <p>
        账单拉取总金额：
        <span>¥ 2233.00</span>
        可开票拉取总金额：
        <span>
          ¥ 2233
        </span>
      </p>
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
    <h1>调整单明细</h1>
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
        :pagination="actualPaginationProps"
        rowKey="id"
        :columns="actualColumns"
        :data-source="actualCata"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">删除</a-button>
        </div>
      </a-table>
      <p>
        实际账单调整总金额：
        <span>¥ 2233.00</span>
        实际可开票调整总金额：
        <span>
          ¥ 2233
        </span>
      </p>
    </div>
    <div>
      <p>
        对账单总金额：
        <span>¥ 2213.00</span>
        可开票总金额：
        <span>¥ 2213.00</span>
      </p>
      <div class="bottom-button">
        <a-button type="primary" @click="save">
          保存
        </a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="publish">
          发布
        </a-button>
        <a-button @click="cancel" style="margin-left: 10px;">
          取消
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action"
        }
      ],
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: ""
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
      actualCata: [],
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
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action"
        }
      ]
    };
  },
  methods: {
    // 保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("recon/save").then(res => {
            this.$message.success("保存成功");
          });
        }
      });
    },
    // 发布
    publish() {
      this.$store.dispatch("recon/publish").then(res => {
        this.$message.success("发布成功");
      });
    },
    // 取消
    cancel() {
      this.$confirm({
        title: "确定要取消吗?",
        onOk: () => {
          this.$store.dispatch("recon/cancel").then(res => {
            this.$message.success("取消成功");
          });
        }
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
          this.$store
            .dispatch("recon/getReconDetailList", this.form)
            .then(res => {
              this.$message.success("拉取成功");
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //查询数据表格 对账单明细
    getList() {
      this.$getList("recon/getReconDetail", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
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
    //查询数据表格（调整单明细）
    getActualList() {
      this.$getList("word/getList", this.actualListQuery).then(res => {
        console.log(res);
        this.actualCata = [...res.data.list];
        this.actualPaginationProps.total = res.data.totalCount * 1;
      });
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
</style>
