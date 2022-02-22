<template>
  <div class="specification">
    <a-button
      icon="plus"
      type="primary"
      style="margin-bottom: 20px;"
      @click="$router.push('/production/cloudServer/newSpecification')"
    >
      新建产品规格族配置
    </a-button>
    <a-table
      :loading="tableLoading"
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :pagination="paginationProps"
    >
      <div slot="createTime" slot-scope="text">
        {{ text | formatDate }}
      </div>
      <div slot="accountType" slot-scope="text">
        {{ text }}
      </div>
      <span
        v-if="text != undefined"
        slot="status"
        slot-scope="text"
        :class="{ status: true, offStatus: text == 0, onStatus: text != 0 }"
      >
        {{ text == 0 ? "关闭" : "启用" }}
      </span>
      <a slot="action" v-permission="'view'" slot-scope="text">
        <a-button
          type="link"
          @click="
            $router.push(`/production/cloudServer/newSpecification?id=${text}`)
          "
        >
          编辑
        </a-button>
        <!-- <a-divider type="vertical" />
        <a-button type="link">
          删除
        </a-button> -->
      </a>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      data: [],
      columns: [
        {
          title: "规格族名称",
          dataIndex: "customTypeFamily",
          width: 220
        },
        {
          title: "规格族CODE",
          dataIndex: "typeFamily",
          width: 220
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          scopedSlots: {
            customRender: "status"
          }
        },
        {
          title: "备注",
          dataIndex: "description",
          key: "description"
        },
        {
          title: "操作",
          dataIndex: "id",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      listQuery: {
        key: undefined,
        search: "",
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
      }
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    getList() {
      this.tableLoading = true;
      this.$getList("specification/getList", this.listQuery).then(res => {
        console.log(res, "获取列表");
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
        this.tableLoading = false;
      });
    },
    // 表格分页快速跳转n页
    quickJump(current) {
      this.listQuery.currentPage = current;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.specification {
  background-color: #fff;
  margin: 0 20px;
  padding: 20px;
}
.status {
  padding: 1px 3px;
  border-radius: 3px;
  color: #fff;
}
.offStatus {
  background-color: #9e9e9e;
}
.onStatus {
  background-color: #01b11f;
}
</style>
