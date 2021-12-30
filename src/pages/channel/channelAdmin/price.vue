<template>
  <div class="channel-price-container">
    <div class="top-search">
      <a-input
        v-model="listQuery.topSearch"
        style="width:500px"
        size="large"
        placeholder="请选择渠道商"
      />
      <a-button type="primary" size="large" @click="search">
        查询
      </a-button>
    </div>
    <div class="price-content">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button type="primary" icon="plus" @click="updatePrice('add')">
              新建产品采购价格
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
                v-for="item in columns.slice(0, columns.length - 1)"
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
          <span slot="discountType" slot-scope="text">
            {{ channelPriceType[text] }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="updatePrice('edit', record)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleDel(record)">
              删除
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { channelPriceType } from "@/utils/enum";
export default {
  data() {
    return {
      channelPriceType,
      listQuery: {
        key: undefined,
        topSearch: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "渠道商ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "渠道商",
          dataIndex: "channelCustomerName",
          key: "channelCustomerName"
        },
        {
          title: "资源池产品",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "资源池产品CODE",
          dataIndex: "productCode",
          key: "productCode"
        },
        {
          title: "折扣方式",
          dataIndex: "discountType",
          key: "discountType",
          scopedSlots: { customRender: "discountType" }
        },
        {
          title: "折扣",
          dataIndex: "discountPrice",
          key: "discountPrice"
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
      const newListQuery = {
        ...this.listQuery,
        ["qp-channelCustomerName-like"]: this.listQuery.topSearch
      };
      this.$getListQp("channel/getPriceList", newListQuery)
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
    // 新增/编辑
    updatePrice(type, record) {
      if (type === "add") {
        this.$router.push("/channel/index/update");
      } else {
        this.$router.push({
          path: "/channel/index/update",
          query: { id: record.id }
        });
      }
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("channel/delPrice", { id: record.id })
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
.channel-price-container {
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
  .price-content {
    padding: 20px;
    margin: 20px;
    background: #fff;
  }
}
</style>
