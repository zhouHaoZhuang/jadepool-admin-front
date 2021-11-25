<template>
  <div>
    <div class="purchase-list-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button type="primary" icon="plus" @click="addChannel">
              新建采购账号
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
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="goDetail(record)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleFrozen(record)">
              删除
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
        total: 500
      },
      columns: [
        {
          title: "采购账号ID",
          dataIndex: "accountCode",
          key: "accountCode"
        },
        {
          title: "所属供应商",
          dataIndex: "supplierCode",
          key: "supplierCode"
        },
        {
          title: "账号标识",
          dataIndex: "accountTag",
          key: "accountTag"
        },
        {
          title: "供应商侧账号ID",
          dataIndex: "supplierAccountCode",
          key: "supplierAccountCode"
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark"
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
      this.$store
        .dispatch(
          "purchase/getList",
          this.listQuery.key
            ? {
                ...this.listQuery,
                [`qp-${this.listQuery.key}-like`]: this.listQuery.search
              }
            : this.listQuery
        )
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
      // this.$store.dispatch("purchase/getList",this.listQuery).then(res => {
      //   console.log("获取数据", res);
      //   this.data = [...res.data.list]
      //   this.paginationProps.total = res.data.totalCount * 1;
      // });
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
    // 编辑
    goDetail(record) {
      this.$router.push({
        path: "/production/supplier/amends",
        query: { id: record.id }
      });
    },
    // 删除
    handleFrozen(record) {
      console.log(record);
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("purchase/updateStatus", record).then(res => {
            this.$message.success("删除成功");
            this.getList();
          });
        }
      });
    },
    // 新增渠道
    addChannel() {
      this.$router.push("/production/supplier/adda");
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
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
