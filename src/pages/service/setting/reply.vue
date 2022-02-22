<template>
  <div class="reply-container">
    <div class="btn-head">
      <a-button
        v-permission="'add'"
        type="primary"
        icon="plus"
        class="btn"
        @click="updateReply('add')"
      >
        添加快捷回复
      </a-button>
      <a-button
        v-permission="'batch-del'"
        :disabled="selectedRowKeys.length === 0"
        icon="delete"
        class="btn"
        @click="handleBatchDel"
      >
        批量删除
      </a-button>
      <a-button
        v-permission="'view'"
        :disabled="selectedRowKeys.length === 0"
        icon="check"
        class="btn"
        @click="handleChangeShow('show')"
      >
        显示
      </a-button>
      <a-button
        v-permission="'disable'"
        :disabled="selectedRowKeys.length === 0"
        icon="stop"
        class="btn"
        @click="handleChangeShow('hide')"
      >
        隐藏
      </a-button>
    </div>
    <div class="table-content">
      <a-table
        :loading="tableLoading"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
      >
        <div class="status" slot="status" slot-scope="text">
          <a-tag v-if="text === 1" color="green">
            启用
          </a-tag>
          <a-tag v-else color="red">
            禁用
          </a-tag>
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            v-permission="'modify'"
            type="link"
            @click="updateReply('edit', record)"
          >
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button
            v-permission="'del'"
            type="link"
            @click="handleDelReply(record)"
          >
            删除
          </a-button>
        </div>
      </a-table>
    </div>
    <!-- 添加/修改快捷回复模板 -->
    <UpdateReply v-model="visible" :id="modalId" @success="getList" />
  </div>
</template>

<script>
import UpdateReply from "@/components/WorkOrder/Reply/updateReply";
export default {
  components: {
    UpdateReply
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = [...selectedRowKeys];
        }
      };
    }
  },
  data() {
    return {
      listQuery: {
        sorter: "desc",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "内容",
          dataIndex: "context"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          dataIndex: "action",
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
      selectedRowKeys: [],
      visible: false,
      modalId: undefined
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询快捷回复列表
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("workorder/quickReplyList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
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
    //添加/修改banner
    updateReply(type, record) {
      this.modalId = type === "add" ? undefined : record.id;
      this.visible = true;
    },
    //删除
    handleDelReply(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("workorder/batchDel", record.id).then(res => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    },
    //批量删除
    handleBatchDel() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("workorder/batchDel", this.selectedRowKeys)
            .then(res => {
              this.$message.success("操作成功");
              this.getList();
            });
        }
      });
    },
    // 显示/隐藏
    handleChangeShow(type) {
      this.$confirm({
        title: `确定要批量${type === "show" ? "显示" : "隐藏"}吗?`,
        onOk: () => {
          const req =
            type === "show" ? "workorder/batchShow" : "workorder/batchHide";
          this.$store.dispatch(req, this.selectedRowKeys).then(res => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.reply-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .btn-head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .btn {
      margin-right: 12px;
    }
  }
  .table-content {
    .status {
      display: flex;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: green;
        margin-right: 5px;
      }
      .dot-err {
        background: red;
      }
    }
  }
}
</style>
