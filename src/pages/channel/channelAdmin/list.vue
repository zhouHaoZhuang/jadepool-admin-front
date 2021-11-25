<template>
  <div>
    <div class="channel-list-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button type="primary" icon="plus" @click="addChannel">
              新建渠道
            </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-select
              style="width:120px"
              allowClear
              v-model="listQuery.key"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in columns.slice(0, columns.length - 3)"
                :key="item.dataIndex"
                :value="item.dataIndex"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="搜索关键词" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="search">
              查询
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
          :scroll="{ x: 1300 }"
        >
          <span slot="addressProject" slot-scope="text" style="color:#1890ff">
            {{ text }}
          </span>
          <div class="status" slot="customerStatus" slot-scope="text">
            <div v-if="text === 0" class="dot"></div>
            <div v-else class="dot dot-err"></div>
            {{ text === 0 ? "正常" : "冻结" }}
          </div>
          <span slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="goDetail(record)">
              查看
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleFrozen(record)">
              {{ record.customerStatus !== 0 ? "解冻" : "冻结" }}
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "渠道商ID",
          dataIndex: "id",
          key: "id",
          width: 260
        },
        {
          title: "全称",
          dataIndex: "cutomerName",
          key: "cutomerName"
        },
        {
          title: "简称",
          dataIndex: "shortName",
          key: "shortName"
        },
        {
          title: "项目网址",
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
          title: "创建时间",
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
      tableLoading: false
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
    // 查看
    goDetail(record) {
      this.$router.push({
        path: "/channel/index/detail",
        query: { id: record.id }
      });
    },
    // 冻结
    handleFrozen(record) {
      const customerStatus = record.customerStatus === 0 ? 1 : 0;
      this.$store
        .dispatch("channel/updateStatus", {
          id: record.id,
          customerStatus
        })
        .then(res => {
          this.$message.success("操作成功");
          const index = this.data.findIndex(ele => ele.id === record.id);
          this.data.splice(index, 1, { ...record, customerStatus });
        });
    },
    // 新增渠道
    addChannel() {
      this.$router.push("/channel/index/add");
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-table-wrap {
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
