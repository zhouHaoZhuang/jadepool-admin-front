<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-button
            type="primary"
            icon="plus"
            @click="$router.push('/finance/recon/addreconManage')"
          >
            新增
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">批量生成</a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">批量发布</a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入对账单号" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入渠道商名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="开始账期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="startValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item> --</a-form-model-item>
        <a-form-model-item>
          <a-date-picker
            placeholder="结束账期"
            format="YYYY-MM-DD HH:mm:ss"
            @change="endValue"
          >
          </a-date-picker>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            placeholder="请选择状态"
            allowClear
            style="width:120px"
            v-model="listQuery.key"
          >
            <a-select-option value="id">
              审核中
            </a-select-option>
            <a-select-option value="applyUserCode">
              已驳回
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
        :pagination="paginationProps"
        rowKey="id"
        :columns="columns"
        :loading="loading"
        :data-source="data"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
      >
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">详情</a-button>
          <a-button type="link">调整</a-button>
          <a-button type="link">编辑</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        status: "",
        startTime: "",
        endTime: "",
        accountType: ""
      },
      columns: [
        {
          title: "对账单号",
          dataIndex: "id"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "开票状态",
          dataIndex: "companyName"
        },
        {
          title: "账期",
          dataIndex: "accountType"
        },
        {
          title: "渠道商ID",
          dataIndex: "title"
        },
        {
          title: "渠道商名称",
          dataIndex: "createTime"
        },
        {
          title: "对账单总金额（元）",
          dataIndex: "feedback"
        },
        {
          title: "最新更新人",
          dataIndex: "feedbackMsg"
        },
        {
          title: "最新更新时间",
          dataIndex: "feedbackTime"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            default: "action"
          }
        }
      ],
      data: [],
      selectedRowKeys: [], // Check here to configure the default column
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
      loading: false
    };
  },
  activated() {
    // this.getList();
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    startValue(date, dateString) {
      this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      this.listQuery.endTime = dateString;
    },
    //查询数据表格
    getList() {
      this.loading = true;
      this.$store.dispatch("recon/getReconList", this.listQuery).then(res => {
        console.log(res);
        this.data = [...res.data.list];
        this.paginationProps.total = res.data.totalCount * 1;
      }).finally(() => {
        this.loading = false;
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
