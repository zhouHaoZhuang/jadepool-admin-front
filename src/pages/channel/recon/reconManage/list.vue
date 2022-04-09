<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-button
            type="primary"
            @click="batchPublish"
            :disabled="selectedRowKeys.length === 0"
          >
            批量发布
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.billNo"
            placeholder="请输入对账单号"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.channelCode"
            placeholder="请输入渠道商名称"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-month-picker
            placeholder="开始账期"
            format="YYYY-MM"
            @change="startValue"
          >
          </a-month-picker>
        </a-form-model-item>
        <a-form-model-item> --</a-form-model-item>
        <a-form-model-item>
          <a-month-picker
            placeholder="结束账期"
            format="YYYY-MM"
            @change="endValue"
          >
          </a-month-picker>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            allowClear
            style="width:200px"
            v-model="listQuery.status"
            placeholder="请选择状态"
          >
            <a-select-option
              :value="inx"
              v-for="(item, inx) in statementStatusEnum"
              :key="inx"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            allowClear
            style="width:200px"
            v-model="listQuery.invoiceStatus"
            placeholder="请选择开票状态"
          >
            <a-select-option
              :value="inx"
              v-for="(item, inx) in invoiceStatusEnum"
              :key="inx"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        rowKey="id"
        :scroll="{ x: 1200 }"
      >
        <div slot="invoiceStatus" slot-scope="text">
          {{ invoiceStatusEnum[text] }}
        </div>
        <div slot="currentStatus" slot-scope="text">
          {{ statementStatusEnum[text] }}
        </div>
        <div v-if="text" slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div v-if="text" slot="feedbackTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div v-if="text" slot="modifyTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push(
                '/finance/recon/reconManageInfo?data=' + JSON.stringify(record)
              )
            "
          >
            详情
          </a-button>
          <a-button
            @click="
              $router.push(
                '/finance/recon/addreconManage?data=' + JSON.stringify(record)
              )
            "
            type="link"
            style="margin-left:10px"
            v-show="record.currentStatus * 1 === 2"
          >
            编辑
          </a-button>
          <a-button
            type="link"
            style="margin-left:10px"
            v-show="record.currentStatus * 1 === 4"
            @click="
              $router.push(
                '/purchase/manage/applybill?data=' + JSON.stringify([record])
              )
            "
          >
            调整
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { invoiceStatusEnum, statementStatusEnum } from "@/utils/enum";
export default {
  data() {
    return {
      invoiceStatusEnum,
      statementStatusEnum,
      listQuery: {
        key: "",
        search: "",
        billNo: "",
        channelCode: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: "",
        currentStatus: undefined,
        invoiceStatus: undefined,
        companyName: "",
        invoiceNo: "",
        status: undefined
      },
      columns: [
        {
          title: "对账单号",
          dataIndex: "billNo",
          width: 180
        },
        {
          title: "状态",
          dataIndex: "currentStatus",
          width: 120,
          scopedSlots: { customRender: "currentStatus" }
        },
        // {
        //   title: "客户名称",
        //   dataIndex: "companyName"
        // },
        {
          title: "开票状态",
          dataIndex: "invoiceStatus",
          scopedSlots: { customRender: "invoiceStatus" },
          width: 120
        },
        {
          title: "账期",
          dataIndex: "billDate",
          width: 120
        },
        {
          title: "渠道商编码",
          dataIndex: "channelCode",
          width: 180
        },
        {
          title: "渠道商名称",
          dataIndex: "channelName",
          width: 180
        },
        {
          title: "对账单总金额（元）",
          dataIndex: "initTotalAmount",
          width: 170
        },
        // {
        //   title: "可开票总金额（元）",
        //   dataIndex: "initInvoiceAmount",
        //   width: 170,
        // },
        {
          title: "最后更新人",
          dataIndex: "modifyUserName",
          width: 140
        },
        {
          title: "最后更新时间",
          dataIndex: "modifyTime",
          scopedSlots: { customRender: "modifyTime" },
          width: 180
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          width: 150,
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      data: [],
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
      selectedRowKeys: [], // Check here to configure the default column
      selectedRowKeysList: []
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    takeOver(id) {
      this.$confirm({
        title: "确定要接收吗?",
        onOk: () => {
          this.$store.dispatch("billmangage/takeOver", { id }).then(() => {
            this.$message.success("接收成功");
            this.getList();
          });
        }
      });
    },
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    onSelectChange(selectedRowKeys, obj) {
      console.log("selectedRowKeys changed: ", selectedRowKeys, obj);
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRowKeysList = obj;
    },
    // 批量发布
    batchPublish() {
      this.$confirm({
        title: "确定要发布吗?",
        onOk: () => {
          this.$store
            .dispatch("reconciliation/batchPublish", {
              bills: this.selectedRowKeys
            })
            .then(() => {
              this.$message.success("发布成功");
              this.getList();
            });
        }
      });
    },
    //查询数据表格
    getList() {
      this.$getList("reconciliation/getList", this.listQuery).then(res => {
        console.log(res, "-------");
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
    }
  }
};
</script>

<style lang="less" scoped>
.bill-manage {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
.public-header-wrap {
  margin-bottom: 10px;
}
</style>
