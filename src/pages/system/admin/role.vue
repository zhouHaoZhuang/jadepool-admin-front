<template>
  <div class="system-role-container">
    <div class="role-content">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button type="primary" icon="plus" @click="handleAddRole">
              添加角色
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="public-table-wrap">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="createdAt" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="handleEditRole(record)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleGoDetail(record)">
              详情
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleDel(record)">
              删除
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 添加/编辑权限弹窗 -->
    <UpdateRoleModal
      v-model="visible"
      :detail="modalDetail"
      @success="modalSuccess"
    />
  </div>
</template>

<script>
import UpdateRoleModal from "@/components/System/updateRoleModal";
export default {
  components: {
    UpdateRoleModal
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "角色Code",
          dataIndex: "code"
        },
        {
          title: "角色描述",
          dataIndex: "description"
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          scopedSlots: { customRender: "createdAt" }
        },
        {
          title: "操作",
          dataIndex: "action",
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
      // 弹窗相关数据
      visible: false,
      modalDetail: {}
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
      this.$store
        .dispatch("system/getRoleList", this.listQuery)
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
    // 新增角色
    handleAddRole() {
      this.modalDetail = {};
      this.visible = true;
    },
    // 编辑角色
    handleEditRole(record) {
      this.modalDetail = { ...record };
      this.visible = true;
    },
    // 添加/编辑弹窗事件成功的回调
    modalSuccess() {
      this.getList();
    },
    // 跳转详情
    handleGoDetail(record) {
      this.$router.push({
        path: "/system/admin/detail",
        query: {
          code: record.code
        }
      });
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("system/delRole", { code: record.code })
            .then(res => {
              this.$message.success("删除成功");
              this.getList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.system-role-container {
  margin-top: -24px;
  .top-search {
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      border-radius: 0 !important;
    }
    .ant-btn-lg {
      border-radius: 0 4px 4px 0 !important;
    }
  }
  .role-content {
    padding: 20px;
    margin: 20px;
    background: #fff;
  }
}
</style>
