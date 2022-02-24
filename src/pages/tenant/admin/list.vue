<template>
  <div class="tenant-list-container">
    <div class="public-header-wrap">
      <a-form-model ref="ruleForm" :model="listQuery" layout="inline">
        <a-form-model-item label="渠道商名称" prop="channelName">
          <a-input
            placeholder="请输入"
            v-model="listQuery.channelName"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item label="账号状态" prop="channelStatus">
          <a-select
            style="width:200px"
            v-model="listQuery.channelStatus"
            placeholder="请选择"
          >
            <a-select-option value="1">
              正常
            </a-select-option>
            <a-select-option value="0">
              冻结
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="onSearch">
            查询
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="public-table-wrap">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        rowKey="id"
        :data-source="data"
        :pagination="paginationProps"
      >
        <div slot="name" slot-scope="text, record">
          <div class="wide">{{ text || "--" }}</div>
          <div>{{ record.channelCode || "--" }}</div>
        </div>
        <div slot="nameTitle">
          <div class="wide">渠道商名称</div>
          <div class="wide">渠道商ID</div>
        </div>
        <div slot="age" slot-scope="text, record">
          <div>{{ text || "--" }}</div>
          <div>{{ record.channelAdminName || "--" }}</div>
        </div>
        <div slot="ageTitle">
          <div class="wide">用户名</div>
          <div class="wide">姓名</div>
        </div>
        <div slot="number" slot-scope="text, record">
          <div>{{ text || "--" }}</div>
          <div>{{ record.channelAdminEmail || "--" }}</div>
        </div>
        <div slot="numberTitle">
          <div class="wide">手机号</div>
          <div class="wide">邮箱</div>
        </div>
        <div slot="status" slot-scope="text, record">
          <div :class="text === 1 ? 'green' : 'red'">
            {{ text === 1 ? "正常" : "冻结" }}
          </div>
          <div>{{ record.channelRegisterTime || "--" }}</div>
        </div>
        <div slot="statusTitle">
          <div class="wide">租户状态</div>
          <div class="wide">注册时间</div>
        </div>
        <div slot="handleTitle">
          <div class="wide">操作</div>
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button type="link" @click="handleDetail(record)">详情</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          width: 20,
          key: "channelName",
          dataIndex: "channelName",
          slots: { title: "nameTitle" },
          scopedSlots: { customRender: "name" }
        },
        {
          width: 20,
          key: "channelAdminUsername",
          dataIndex: "channelAdminUsername",
          slots: { title: "ageTitle" },
          scopedSlots: { customRender: "age" }
        },
        {
          width: 20,
          key: "channelAdminPhone",
          dataIndex: "channelAdminPhone",
          slots: { title: "numberTitle" },
          scopedSlots: { customRender: "number" }
        },
        {
          width: 20,
          key: "channelStatus",
          dataIndex: "channelStatus",
          slots: { title: "statusTitle" },
          scopedSlots: { customRender: "status" }
        },
        {
          width: 20,
          key: "action",
          dataIndex: "action",
          slots: { title: "handleTitle" },
          scopedSlots: { customRender: "action" }
        }
      ],
      listQuery: {
        channelName: "",
        channelStatus: undefined,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询
    onSearch() {
      this.getList();
    },
    // 获取表格数据
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("tenant/getList", {
          ...this.listQuery,
          "qp-channelName-eq": this.listQuery.channelName,
          "qp-channelStatus-eq": this.listQuery.channelStatus
        })
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.getList();
    },
    // 查看详情
    handleDetail(record) {
      this.$router.push({
        path: "/tenant/index/detail",
        query: {
          id: record.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tenant-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
}
.wide {
  font-weight: 700;
}
.red,
.green {
  display: flex;
  align-items: center;
}
.red:before {
  content: " ";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: red;
}

.green:before {
  content: " ";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: green;
}
</style>
