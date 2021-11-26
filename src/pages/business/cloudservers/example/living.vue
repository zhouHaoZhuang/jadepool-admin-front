<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="正常">
            <div class="public-header-wrap">
              <a-form-model layout="inline" :model="listQuery">
                  <!-- 下拉框 -->
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
                <!-- 搜索 -->
                <a-form-model-item>
                  <a-input
                    v-model="listQuery.search"
                    placeholder="搜索关键词"
                  />
                </a-form-model-item>
                <!-- 按钮 -->
                <a-form-model-item>
                  <a-button type="primary" @click="search">
                    查询
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
            <!-- 表格 -->
            <a-table
              :columns="columns"
              :data-source="data"
              :scroll="{ x: 2100 }"
            >
              <a slot="action" slot-scope="" href="javascript:;" @click="addChannel">管理</a>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="即将到期" force-render>
            Content of Tab Pane 2
          </a-tab-pane>
          <a-tab-pane key="3" tab="已到期">
            Content of Tab Pane 3
          </a-tab-pane>
          <a-tab-pane key="4" tab="已删除">
            Content of Tab Pane 3
          </a-tab-pane>
        </a-tabs>
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
          title: "实例ID",
          width: 100,
          dataIndex: "name",
          key: "name",
          fixed: "left"
        },
        {
          title: "IP",
          width: 100,
          dataIndex: "age",
          key: "age",
          fixed: "left"
        },
        { title: "弹性IP", dataIndex: "address", key: "1" },
        { title: "共享类型", dataIndex: "address", key: "2" },
        { title: "区域", dataIndex: "address", key: "3" },
        { title: "CPU", dataIndex: "address", key: "4" },
        { title: "内存", dataIndex: "address", key: "5" },
        { title: "磁盘", dataIndex: "address", key: "6" },
        { title: "带宽", dataIndex: "address", key: "7" },
        { title: "渠道ID", dataIndex: "address", key: "8" },
        { title: "企业ID", dataIndex: "address", key: "9" },
        { title: "实例创建时间", dataIndex: "address", key: "10" },
        { title: "实例到期时间", dataIndex: "address", key: "11" },
        { title: "实例状态", dataIndex: "address", key: "12" },
        { title: "运行状态", dataIndex: "address", key: "13" },
        { title: "操作状态", dataIndex: "address", key: "14" },
        { title: "操作", dataIndex: "address", key: "15" },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 40,
          address: "London Park"
        },
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
    callback(key) {
      console.log(key);
    },
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
    //
    addChannel() {
      this.$router.push("/business/cloudservers/adds");
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-header-wrap {
      padding-bottom: 10px;
  }
}
</style>
