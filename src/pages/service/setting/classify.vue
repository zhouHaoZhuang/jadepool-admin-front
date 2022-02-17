<template>
  <div class="classify-container">
    <div class="btn-head">
      <a-button
        v-permission="'add'"
        type="primary"
        icon="plus"
        class="btn"
        @click="updateType('add')"
      >
        添加类别
      </a-button>
    </div>
    <div class="table-content">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
      >
        <div slot="type" slot-scope="text">
          {{ workOrderTypeEnum[text] }}
        </div>
        <div slot="count" slot-scope="text">
          <a-button type="link" @click="handleSelect">
            查看({{ text }})
          </a-button>
        </div>
        <div slot="status" slot-scope="text">
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
            @click="updateType('edit', record)"
          >
            修改
          </a-button>
          <a-divider type="vertical" />
          <a-button
            v-permission="'del'"
            type="link"
            @click="handleDelType(record)"
          >
            删除
          </a-button>
        </div>
      </a-table>
    </div>
    <!-- 添加/修改分类 -->
    <UpdateType v-model="visible" :id="modalId" @success="getList" />
  </div>
</template>

<script>
import UpdateType from "@/components/WorkOrder/Type/updateType";
import { workOrderTypeEnum } from "@/utils/enum";
export default {
  components: {
    UpdateType
  },
  data() {
    return {
      workOrderTypeEnum,
      listQuery: {
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
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "工单类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "工单",
          dataIndex: "count",
          scopedSlots: { customRender: "count" }
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
      visible: false,
      modalId: undefined
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询工单分类列表
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("workorder/workOrderTypeList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
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
    //添加/修改分类
    updateType(type, record) {
      this.modalId = type === "add" ? undefined : record.id;
      this.visible = true;
    },
    // 跳转工单列表
    handleSelect() {
      this.$router.push("/service/workorderManage/list");
    },
    //删除
    handleDelType(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store
            .dispatch("workorder/delWorkOrderType", record.id)
            .then(res => {
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
.classify-container {
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
