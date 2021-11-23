<template>
  <div class="channel-price-container">
    <div class="top-search">
      <a-input v-model="listQuery.search" size="large" placeholder="请选择渠道商" />
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
              v-model="listQuery.id"
              placeholder="产品名称"
            >
              <a-select-option :value="1">
                Jack
              </a-select-option>
              <a-select-option :value="2">
                TOM
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
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="updatePrice('edit', record)">
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
        id: undefined,
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 500
      },
      columns: [
        {
          title: "渠道商ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "渠道商",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "资源池产品",
          dataIndex: "name1",
          key: "name1"
        },
        {
          title: "资源池产品CODE",
          dataIndex: "web",
          key: "web"
        },
        {
          title: "折扣方式",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "折扣",
          dataIndex: "gmtCreate"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          id: 1,
          name: "全程",
          name1: "剑圣",
          web: "www.baidu.com",
          status: 200,
          gmtCreate: "2021-10-12"
        }
      ],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.pageNo} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  methods: {
    // 查询
    search() {
      // this.getList();
    },
    // 查询表格数据
    getList() {
      this.$store.dispatch("").then(res => {
        console.log("获取数据", res);
        this.paginationProps.total = 500;
      });
    },
    // 表格分页快速跳转n页
    quickJump(pageNo) {
      this.listQuery.pageNo = pageNo;
      // this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageNo = current;
      this.listQuery.pageSize = pageSize;
      // this.getList();
    },
    // 冻结
    handleFrozen(record) {},
    // 新增/编辑
    updatePrice(type, record) {
      if (type === "add") {
        this.$router.push("/channel/index/add");
      } else {
        this.$router.push({
          path: "/channel/index/detail",
          query: { id: record.id }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.channel-price-container {
  margin-top: -24px;
  .top-search {
    height: 80px;
    background: pink;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .price-content {
    padding: 20px;
    margin: 20px;
    background: #fff;
  }
}
</style>
