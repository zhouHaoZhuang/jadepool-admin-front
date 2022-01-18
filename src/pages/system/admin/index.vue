<template>
  <div class="system-admin-container">
    <div class="btns">
      <a-space>
        <a-button
          v-permission="'add'"
          type="primary"
          icon="plus"
          @click="handleAdd"
        >
          添加权限
        </a-button>
      </a-space>
    </div>
    <div class="table-con">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="code"
        :pagination="paginationProps"
      >
        <span slot="type" slot-scope="text">
          {{ systemAdminMapEnum[text] }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button
            v-permission="'edit'"
            type="link"
            @click="handleEdit(record)"
          >
            编辑
          </a-button>
          <a-divider type="vertical" />
          <a-button v-permission="'del'" type="link" @click="handleDel(record)">
            删除
          </a-button>
        </span>
        <!-- 展开的行 -->
        <div v-if="record" slot="expandedRowRender" slot-scope="record" class="actions-wrap">
          <div class="title">权限操作：</div>
          <div v-if="record.actions&&record.actions.length === 0" class="none">暂无操作</div>
          <div v-if="record.actions&&record.actions.length > 0" class="list">
            <div
              v-for="(ele, index) in record.actions"
              :key="index"
              class="item"
            >
              <a-tooltip placement="top">
                <template slot="title">
                  <span>{{ ele.description }}</span>
                </template>
                <span>
                  {{ ele.name }}
                </span>
              </a-tooltip>
            </div>
          </div>
        </div>
      </a-table>
    </div>
    <!-- 添加/编辑权限弹窗 -->
    <UpdateAdminModal
      v-model="visible"
      :detail="modalDetail"
      @success="modalSuccess"
    />
  </div>
</template>

<script>
import UpdateAdminModal from "@/components/System/updateAdminModal";
import { systemAdminMapEnum } from "@/utils/enum";
export default {
  components: {
    UpdateAdminModal
  },
  data() {
    return {
      systemAdminMapEnum,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isAll: false
      },
      columns: [
        {
          title: "权限名称",
          dataIndex: "code"
        },
        {
          title: "权限",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "描述",
          dataIndex: "description"
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
        .dispatch("system/getAdminList", this.listQuery)
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
    // 添加权限
    handleAdd() {
      this.modalDetail = {};
      this.visible = true;
    },
    // 编辑权限
    handleEdit(record) {
      this.modalDetail = { ...record };
      this.visible = true;
    },
    // 添加/编辑弹窗事件成功的回调
    modalSuccess() {
      this.getList();
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("system/delAdmin", { code: record.code })
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
.system-admin-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .btns {
    margin-bottom: 20px;
  }
  .table-con {
    .actions-wrap {
      .title {
        font-size: 16px;
      }
      .list {
        display: flex;
        margin-top: 10px;
        .item {
          margin: 0 8px 0 0;
          padding: 0 7px;
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
