<template>
  <div>
    <div class="purchase-list-container">
      <!-- 分页 -->
      <div>
        <a-tabs default-active-key="1" @change="callback">
            <!-- 表格 -->
          <a-tab-pane key="1" tab="正常">
            <a-table
              :columns="columns"
              :data-source="data"
              :scroll="{ x: 1300 }"
            >
              <a slot="action" slot-scope="" href="javascript:;">action</a>
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
const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" }
  }
];
const data = [
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
  }
];
export default {
  data() {
    return {
      data,
      columns
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
}
</style>
