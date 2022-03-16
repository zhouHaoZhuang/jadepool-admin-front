<template>
  <div class="bill-manage">
    <div class="public-header-wrap">
      <a-form-model layout="inline">
        <a-form-model-item>
          <a-input placeholder="请输入发票ID" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入客户名称" />
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
          <a-button type="primary">查询</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data">
        <div slot="companyName" slot-scope="text">{{ text }}</div>
        <div slot="action">
          <a-button type="link">详情</a-button>
          <a-button type="link">接受</a-button>
          <a-button type="link">审核</a-button>
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
          title: "发票ID",
          dataIndex: "id"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "客户名称",
          dataIndex: "companyName"
        },
        {
          title: "开票金额",
          dataIndex: "amount"
        },
        {
          title: "发票抬头",
          dataIndex: "title"
        },
        {
          title: "创建时间",
          dataIndex: "createTime"
        },
        {
          title: "反馈时间",
          dataIndex: "feedbackTime"
        },
        {
          title: "反馈信息",
          dataIndex: "feedbackMsg"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            default: "action"
          }
        }
      ],
      data: []
    };
  },
  methods: {
    startValue(date, dateString) {
      // this.listQuery.startTime = dateString;
    },
    endValue(date, dateString) {
      // this.listQuery.endTime = dateString;
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
