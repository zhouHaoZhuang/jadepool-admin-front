<template>
  <div class="system-admin-index-container">
    <div class="btns">
      <a-space>
        <a-button type="primary" icon="plus" @click="addAdmin">
          添加管理员
        </a-button>
        <a-button :disabled="selectedRowKeys.length === 0" icon="check">启用</a-button>
        <a-button :disabled="selectedRowKeys.length === 0" icon="stop">禁用</a-button>
        <a-button :disabled="selectedRowKeys.length === 0" icon="check">解锁</a-button>
        <a-button :disabled="selectedRowKeys.length === 0" icon="stop">锁定</a-button>
      </a-space>
    </div>
    <div class="table-con">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: record => ({
            props: { disabled: record.id === 1 }
          })
        }"
        :scroll="{ x: 1300 }"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="handleDel(record)">
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="handleDel(record)">
            删除
          </a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: 260
        },
        {
          title: "手机号(登录账号)",
          dataIndex: "cutomerName",
          key: "cutomerName"
        },
        {
          title: "姓名",
          dataIndex: "shortName",
          key: "shortName"
        },
        {
          title: "权限组",
          dataIndex: "addressProject",
          key: "addressProject",
          scopedSlots: { customRender: "addressProject" }
        },
        {
          title: "状态",
          dataIndex: "customerStatus",
          key: "customerStatus",
          scopedSlots: { customRender: "customerStatus" }
        },
        {
          title: "锁定状态",
          dataIndex: "createTime",
          key: "createTime",
          scopedSlots: { customRender: "createTime" },
          width: 250
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
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
      tableLoading: false,
      selectedRowKeys: []
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("channel/getList", this.listQuery)
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
    // 表格选择
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 添加管理员
    addAdmin() {}
  }
};
</script>

<style lang="less" scoped>
.system-admin-index-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .btns {
    margin-bottom: 20px;
  }
  .table-con {
  }
}
</style>
