<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input
            v-model="listQuery.invoiceNo"
            placeholder="请输入发票ID"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.companyName"
            placeholder="请输入渠道商名称"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="创建开始日期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="startValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item> --</a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="创建结束日期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="endValue"
          >
          </a-date-picker>
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
        rowKey="id"
      >
        <div slot="status" slot-scope="text">
          {{ invoiceStatusEnum[text] }}
        </div>
        <div slot="feedbackRemark" slot-scope="text, record">
          <span v-if="record.status === 4">
            {{ record.rejectRemark }}
          </span>
          <span v-if="record.status === 5">
            {{ text }}
          </span>
        </div>
        <div v-if="text" slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div v-if="text" slot="feedbackTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="$router.push('/sale/finance/billInfo?id=' + record.id)"
          >
            详情
          </a-button>
          <a-button
            type="link"
            style="margin-left:10px"
            :disabled="record.status !== 1"
            @click="takeOver(record.id)"
          >
            接收
          </a-button>
          <a-button
            type="link"
            style="margin-left:10px"
            @click="$router.push('/sale/finance/auditbill?id=' + record.id)"
            :disabled="record.status !== 3"
          >
            审核
          </a-button>
          <a-button
            type="link"
            v-if="record.status === 5"
            style="margin-left:10px"
            @click="$router.push('/sale/finance/editbill?id=' + record.id)"
          >
            编辑
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
      invoiceStatusEnum,
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        startTime: "",
        endTime: "",
        companyName: "",
        invoiceNo: "",
        status: undefined
      },
      columns: [
        {
          title: "发票ID",
          dataIndex: "invoiceNo"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "渠道商名称",
          dataIndex: "companyName"
        },
        {
          title: "开票金额",
          dataIndex: "invoiceAmount"
        },
        {
          title: "发票抬头",
          dataIndex: "invoiceTitle"
        },
        {
          title: "创建时间",
          dataIndex: "createTimeShow"
        },
        {
          title: "反馈时间",
          dataIndex: "feedbackTimeShow"
        },
        {
          title: "反馈信息",
          dataIndex: "feedbackRemark",
          scopedSlots: { customRender: "feedbackRemark" }
        },
        {
          title: "操作",
          dataIndex: "action",
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
      }
    };
  },
  activated() {
    // this.getList();
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
    //查询数据表格
    getList() {
      this.$getList("billmangage/getList", this.listQuery).then(res => {
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
</style>
