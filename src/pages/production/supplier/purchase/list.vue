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
              v-model="listQuery.id"
              placeholder="采购账号ID"
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
  name: "index",
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
          title: "采购账号ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "所属供应商",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "账号标识",
          dataIndex: "name1",
          key: "name1"
        },
        {
          title: "供应商侧账号ID",
          dataIndex: "web",
          key: "web",
        },
        {
          title: "备注",
          dataIndex: "status",
          key: "status",
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
          id: "SA00001",
          name: "阿里云（aliyun）",
          name1: "shhhxx001",
          web: "1695953920158663",
          status: "游戏盒子专用账号",
          gmtCreate: "2016-09-21  08:50:08"
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
    // 编辑
    goDetail(record) {
      this.$router.push({
        path: "/production/supplier/amends",
        query: { id: record.id }
      });
    },
    // // 删除
    // handleFrozen(record) {},
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
