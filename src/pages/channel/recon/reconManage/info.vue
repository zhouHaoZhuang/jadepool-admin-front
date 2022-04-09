<template>
  <div class="recon-info">
    <a-descriptions title="基本信息" v-if="data">
      <a-descriptions-item label="对账单号">
        {{ data.billNo }}
      </a-descriptions-item>
      <a-descriptions-item label="渠道商">
        {{ data.channelName }}
      </a-descriptions-item>
      <a-descriptions-item label="账期">
        {{ data.billDate }}
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        {{ statementStatusEnum[data.currentStatus] }}
      </a-descriptions-item>
      <a-descriptions-item label="开票状态">
        {{ invoiceStatusEnum[data.invoiceStatus] }}
      </a-descriptions-item>
      <a-descriptions-item label="最后更新人">
        {{ data.modifyUserName }}
      </a-descriptions-item>
      <a-descriptions-item label="最后更新时间">
        {{ data.modifyTime | formatDate }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ data.memo }}
      </a-descriptions-item>
    </a-descriptions>
    <div>
      <div class="table-title">
        对账单明细
      </div>
      <div>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input
              v-model="listQuery.id"
              placeholder="请输入账单编号"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="getsteerList">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div>
        <a-table
          :columns="columnsDetails"
          :data-source="dataDetails"
          :pagination="paginationProps"
          rowKey="id"
        >
          <div slot="finishTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
        </a-table>
        <p>
          账单拉取总金额：
          <span style="color:#02A7F0;">¥ {{ details.totalAmount }}</span>
          可开票拉取总金额：
          <span style="color:#02A7F0;">¥ {{ details.invoiceAmount }}</span>
        </p>
      </div>
      <div class="table-title">
        调整单明细
      </div>
      <b style="display:inline-block">建议调整项</b>
      <!-- <a-button style="margin-left: 20px;" type="primary" @click="showModal">
        新增建议调整项
      </a-button> -->
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
          :model="form"
          :rules="rules"
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
      <div>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input
              v-model="steerListQuery.id"
              placeholder="请输入账单编号"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="getsteerListSteer">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div>
        <a-table
          :columns="steercolumns"
          :data-source="steerdata"
          :pagination="steerPaginationProps"
          rowKey="id"
        >
          <div slot="finishTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
        </a-table>
        <p>
          建议账单调整总金额：
          <span style="color:#02A7F0;">¥ {{ steer.totalAmount }}</span>
          建议可开票调整总金额：
          <span style="color:#02A7F0;">¥ {{ steer.invoiceAmount }}</span>
        </p>
      </div>
      <b>实际调整项</b>
      <div>
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-input
              v-model="actualListQuery.id"
              placeholder="请输入账单编号"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="getsteerListActual">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div>
        <a-table
          :columns="actualColumns"
          :data-source="actualData"
          :pagination="actualPaginationProps"
          rowKey="id"
        >
          <div slot="finishTime" slot-scope="text">
            {{ text | formatDate }}
          </div>
        </a-table>
        <p>
          实际账单调整总金额：
          <span style="color:#02A7F0;">¥{{ actual.totalAmount }}</span>
          实际可开票调整总金额：
          <span style="color:#02A7F0;">¥ {{ actual.invoiceAmount }}</span>
        </p>
      </div>
      <p>
        对账单总金额:
        <span style="color:#02A7F0;">¥ {{ amount.totalAmount }}</span>
        可开票总金额：
        <span style="color:#02A7F0;">¥ {{ amount.invoiceAmount }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum, statementStatusEnum } from "@/utils/enum";

export default {
  data() {
    return {
      data: null,
      steerdata: [],
      invoiceStatusEnum,
      statementStatusEnum,
      actualData: null,
      listQuery: {
        //(对账单明细)
        key: "",
        search: "",
        id: "",
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      steercolumns: [
        {
          title: "账单编号",
          dataIndex: "id"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "finishTime",
          scopedSlots: { customRender: "finishTime" }
        },
        {
          title: "原账单金额（元）",
          dataIndex: "totalAmount"
        },
        {
          title: "原可开票金额（元）",
          dataIndex: "actualAmount"
        },
        {
          title: "账单调整金额（元）",
          dataIndex: "recheckTotalAmount"
        },
        {
          title: "可开票调整金额（元）",
          dataIndex: "recheckInvoiceAmount"
        },
        {
          title: "调整后账单金额（元）",
          dataIndex: "afterTotalAmount"
        },
        {
          title: "调整后可开票金额（元）",
          dataIndex: "afterInvoiceAmount"
        }
      ],
      columnsDetails: [
        {
          title: "账单编号",
          dataIndex: "id"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "finishTime",
          scopedSlots: { customRender: "finishTime" }
        },
        {
          title: "账单金额（元）",
          dataIndex: "totalAmount"
        },
        {
          title: "可开票金额（元）",
          dataIndex: "actualAmount",
          key: "kactualAmount"
        }
      ],
      actualColumns: [
        {
          title: "账单编号",
          dataIndex: "id"
        },
        {
          title: "类型",
          dataIndex: "type"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "消费时间",
          dataIndex: "finishTime",
          scopedSlots: { customRender: "finishTime" }
        },
        {
          title: "原账单金额（元）",
          dataIndex: "totalAmount"
        },
        {
          title: "原可开票金额（元）",
          dataIndex: "actualAmount"
        },
        {
          title: "账单调整金额（元）",
          dataIndex: "recheckTotalAmount"
        },
        {
          title: "可开票调整金额（元）",
          dataIndex: "recheckInvoiceAmount"
        },
        {
          title: "调整后账单金额（元）",
          dataIndex: "afterTotalAmount"
        },
        {
          title: "调整后可开票金额（元）",
          dataIndex: "afterInvoiceAmount"
        }
      ],
      dataDetails: null,
      paginationProps: {
        //(对账单明细)
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.pageNo} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      steerListQuery: {
        //(建议调整项)
        id: "",
        key: "",
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      steer: {},
      steerPaginationProps: {
        //(建议调整项)
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.steerListQuery.pageNo} / ${Math.ceil(
            total / this.steerListQuery.pageSize
          )} 页`,
        onChange: this.quickJumpSteer,
        onShowSizeChange: this.onShowSizeChangeSteer
      },
      actualListQuery: {
        //(实际调整项)
        id: "",
        key: "",
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      details: {},
      actual: {},
      actualPaginationProps: {
        //(实际调整项)
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.actualListQuery.pageNo} / ${Math.ceil(
            total / this.actualListQuery.pageSize
          )} 页`,
        onChange: this.quickJumpActual,
        onShowSizeChange: this.onShowSizeChangeActual
      },
      visible: false,
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "当前选项不能为空",
            trigger: "blur"
          }
        ]
      },
      amount: {}
    };
  },
  activated() {
    this.data = JSON.parse(this.$route.query.data);
    console.log(`this.data: `, this.data);
    this.getsteerList({ billNo: this.data.billNo });
    this.getsteerListSteer();
    this.getsteerListActual();
    this.getAmount();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 确认添加
    handleOk(e) {
      this.confirmLoading = true;
      this.onSubmit();
    },
    // 取消（关闭弹窗）
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    // 添加建议调整项
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("reconciliation/addSteerItem", this.form)
            .then(() => {
              this.confirmLoading = false;
              this.visible = false;
              this.$message.success("添加成功");
            });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    del(id) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("reconciliation/del", { id }).then(() => {
            this.$message.success("删除成功");
            // this.getData();
          });
        }
      });
    },
    // 确认
    confirm(id) {
      this.$store.dispatch("reconciliation/confirm", { id }).then(() => {
        this.$message.success("操作成功");
        // this.getData();
      });
    },
    // 退回
    goBack(id) {
      this.$store.dispatch("reconciliation/goBack", { id }).then(() => {
        this.$message.success("操作成功");
        // this.getData();
      });
    },
    // 开票明细
    getsteerList(obj) {
      let data = obj ? { ...this.listQuery, ...obj } : this.listQuery;
      this.$store.dispatch("reconciliation/getsteerList", data).then(res => {
        console.log(`获取开票明细`, res);
        this.dataDetails = res.data.page?.list??[];
        this.paginationProps.total = res.data.page?.totalCount * 1??0;
        this.details = res.data;
      });
    },
    // 建议调整项
    getsteerListSteer() {
      this.$store
        .dispatch("reconciliation/getsteerListSteer", {
          ...this.steerListQuery,
          billNo: this.data.billNo
        })
        .then(res => {
          this.steerdata = res.data.page?.list??[];
          this.steerPaginationProps.total = res.data.page?.totalCount * 1??0;
          this.steer = res.data;
        });
    },
    // 实际调整项
    getsteerListActual() {
      this.$store
        .dispatch("reconciliation/getsteerListActual", {
          ...this.actualListQuery,
          billNo: this.data.billNo
        })
        .then(res => {
          this.actualData = res.data.page?.list??[];
          this.actualPaginationProps.total = res.data.page?.totalCount * 1??0;
          this.actual = res.data;
        });
    },
    // 获取金额
    getAmount(item) {
      let data = JSON.parse(this.$route.query.data);
      this.$store
        .dispatch("reconciliation/getAmount", {
          billNo: data.billNo
        })
        .then(res => {
          console.log(res);
          this.amount = res.data;
        });
    },
    // 获取页面数据
    getData() {
      this.$store.dispatch("reconciliation/getData").then(res => {
        this.data = res.data;
        this.actualData = res.actualData;
        // this.dataDetails = res.dataDetails;
      });
    },
    //表格分页跳转(对账单明细)
    quickJump(currentPage) {
      this.listQuery.pageNo = currentPage;
      this.getsteerList();
    },
    //表格分页切换每页条数(对账单明细)
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageNo = current;
      this.listQuery.pageSize = pageSize;
      this.getsteerList();
    },
    //表格分页跳转(建议调整项)
    quickJumpSteer(currentPage) {
      this.steerListQuery.pageNo = currentPage;
      this.getsteerListSteer();
    },
    //表格分页切换每页条数(建议调整项)
    onShowSizeChangeSteer(current, pageSize) {
      this.steerListQuery.pageNo = current;
      this.steerListQuery.pageSize = pageSize;
      this.getsteerListSteer();
    },

    //表格分页跳转(实际调整项)
    quickJumpActual(currentPage) {
      this.actualListQuery.pageNo = currentPage;
      this.getsteerListActual();
    },
    //表格分页切换每页条数(实际调整项)
    onShowSizeChangeActual(current, pageSize) {
      this.actualListQuery.pageNo = current;
      this.actualListQuery.pageSize = pageSize;
      this.getsteerListActual();
    }
  }
};
</script>

<style lang="less" scoped>
.recon-info {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
.table-title {
  margin-bottom: 20px;
  color: #000000d9;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
}
b {
  display: block;
  margin-bottom: 10px;
  color: #000;
}
.bottom-button {
  text-align: center;
}
</style>
