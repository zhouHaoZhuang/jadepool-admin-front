<template>
  <div class="message-container">
    <div class="tabs">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="全部消息"> </a-tab-pane>
        <a-tab-pane key="2" tab="未读消息"> </a-tab-pane>
        <a-tab-pane key="3" tab="已读消息"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="btns">
      <a-space>
        <a-button :disabled="selectedRowKeys.length === 0">标记为已读</a-button>
        <a-button>全部标记为已读</a-button>
        <a-button :disabled="selectedRowKeys.length === 0">删除</a-button>
      </a-space>
    </div>
    <div class="table-con">
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: record => ({
            props: { disabled: record.id === 1 }
          })
        }"
        :customRow="customRowSet"
        :rowClassName="tableRowClass"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="handleDel(record)">
            删除
          </a-button>
        </span>
      </a-table>
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
          title: "标题",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "内容",
          dataIndex: "name1",
          key: "name1"
        },
        {
          title: "发送时间",
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
          gmtCreate: "2021-10-12"
        },
        {
          id: 2,
          name: "全程",
          name1: "剑圣",
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
      },
      selectedRowKeys: []
    };
  },
  methods: {
    // tabs切换回调
    callback(key) {
      console.log(key);
    },
    // 表格选择
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 设置表格的每一行样式是否禁用
    tableRowClass(record, index) {
      if (record.id === 1) {
        return "table-row row-disable";
      }
      return "table-row";
    },
    // 设置表格的每一行点击事件
    customRowSet(record) {
      return {
        on: {
          // 事件
          click: event => {
            console.log("表格行点击", record);
            if (record.id !== 1) {
              this.$router.push({
                path: "/dashboard/index/detail",
                query: { id: record.id }
              });
            }
          }
        }
      };
    },
    // 表格行删除单个
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          // this.$store.dispatch("").then(res => {});
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.message-container {
  background: #fff;
  margin: 0 24px;
  padding-top: 5px;
  .btns {
    padding-left: 15px;
    margin-bottom: 20px;
  }
  .table-con {
    padding: 0 15px;
  }
}
</style>
<style lang="less">
.message-container {
  .ant-tabs-bar {
    padding-left: 15px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
  }
  .table-row {
    cursor: pointer;
  }
  .row-disable {
    color: #ccc !important;
  }
}
</style>
