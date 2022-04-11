<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input v-model="listQuery.invoiceNo" placeholder="请输入发票ID" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.createUserName"
            placeholder="请输入渠道商名称"
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
        <div v-if="text" slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div v-if="text" slot="refundFeedbackTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            type="link"
            @click="
              $router.push('/finance/examine/refundApply?id=' + record.id)
            "
          >
            详情
          </a-button>
          <a-button
            type="link"
            style="margin-left: 10px"
            :disabled="record.status !== 6"
            @click="
              $router.push('/finance/examine/reviewRefund?id=' + record.id)
            "
          >
            审核
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
        invoiceNo: "",
        createUserName: "",
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: undefined,
        startTime: "",
        endTime: ""
      },
      columns: [
        {
          title: "发票ID",
          dataIndex: "invoiceNo"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: {
            customRender: "status"
          }
        },
        {
          title: "渠道商名称",
          dataIndex: "createUserName"
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
          title: "退票申请创建时间",
          dataIndex: "refundCreateTimeShow"
        },
        {
          title: "备注",
          dataIndex: "refundRemark"
        },
        {
          title: "退票申请反馈时间",
          dataIndex: "feedbackTimeShow"
        },
        {
          title: "退票申请反馈说明",
          dataIndex: "feedbackRemark"
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
    this.getList();
  },
  methods: {
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    //查询数据表格
    getList() {
      this.$getList("refundmangage/getList", this.listQuery).then(res => {
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
