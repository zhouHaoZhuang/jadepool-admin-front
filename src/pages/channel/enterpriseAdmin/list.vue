<template>
  <div>
    <div class="enterprise-list-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-select
              style="width:120px"
              allowClear
              v-model="listQuery.id"
              placeholder="企业ID"
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
          <div class="status" slot="name1" slot-scope="text">
            <div v-if="text === 200" class="dot"></div>
            <div v-else class="dot dot-err"></div>
            {{ text === 200 ? "正常" : "冻结" }}
          </div>
          <div class="status" slot="status" slot-scope="text">
            <div v-if="text === 200" class="dot"></div>
            <div v-else class="dot dot-err"></div>
            {{ text === 200 ? "正常" : "冻结" }}
          </div>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="goDetail(record)">
              查看
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleFrozen(record)">
              冻结
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
          title: "企业ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "认证状态",
          dataIndex: "name1",
          key: "name1",
          scopedSlots: { customRender: "name1" }
        },
        {
          title: "所属渠道商",
          dataIndex: "web",
          key: "web"
        },
        {
          title: "渠道商ID",
          dataIndex: "web1",
          key: "web1"
        },
        {
          title: "企业状态",
          dataIndex: "status",
          key: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "创建时间",
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
          web1: "1234",
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
    // 查看
    goDetail(record) {
      this.$router.push({
        path: "/channel/enterprise/detail",
        query: { id: record.id }
      });
    },
    // 冻结
    handleFrozen(record) {}
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-container {
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
