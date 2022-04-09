<template>
  <div>
    <div class="member-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button
              type="primary"
              class="btn-one"
              @click="addCustomer('add')"
            >
              添加客服
            </a-button>
            <a-button type="primary" @click="distribute"> 分配客服 </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-input
              v-model="listQuery.name"
              allow-clear
              placeholder="请输入客服姓名"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="searchClick"> 查询 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="member-contenttable">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="customers" slot-scope="text, record">
            <a-button type="link" @click="selectInfo(record.id, text)">
              查看
            </a-button>
            ({{ text }})
          </span>
          <span slot="action" slot-scope="text, record" class="action">
            <a-space>
              <a-button type="link" @click="editortInfo(record)">
                编辑
              </a-button>
              <a-button type="link" @click="delInfo(record)"> 删除 </a-button>
            </a-space>
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
      title: "realName",
      data: [],
      selectedRowKeys: [],
      columns: [
        {
          title: "客服ID",
          dataIndex: "id",
        },
        {
          title: "客服姓名",
          dataIndex: "name",
        },
        {
          title: "工号",
          dataIndex: "employeeId",
        },
        {
          title: "联系方式",
          dataIndex: "phone",
        },
        {
          title: "QQ",
          dataIndex: "qq",
        },
        {
          title: "微信号",
          dataIndex: "wechat",
        },
        {
          title: "客户",
          dataIndex: "customers",
          scopedSlots: { customRender: "customers" },
        },
        {
          title: "操作",
          Index: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      listQuery: {
        name: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} /  ${Math.ceil(
            total / this.paginationProps.pageSize
          )} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange,
      },
    };
  },
  created() {
    this.getList();
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/channel/index/customermanage") {
          this.getList();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    changepage(current) {
      this.paginationProps.current = current;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.paginationProps.pageSize = pageSize;
      this.paginationProps.current = current;
      this.getList();
    },
    getList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch("customer/getList", this.listQuery)
        .then((res) => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {});
    },
    distribute(type, record) {
      this.$router.push({
        path: "/channel/index/distribute",
        query: {
          updateType: type,
          id: type === "edit" ? record.id : undefined,
        },
      });
    },
    //添加客服
    addCustomer() {
      this.$router.push({
        path: "/channel/index/addcustomer",
      });
    },
    //查看
    selectInfo(key, text) {
      console.log(text, "<<<");
      // if (text === 0) {
      //   this.$message.warning("该客服暂无客户");
      // } else {
      //   this.$router.push({
      //     path: "/channel/index/list",
      //     query: {
      //       id: key,
      //     },
      //   });
      // }
    },
    //编辑客服
    editortInfo(record) {
      this.$router.push({
        path: "/channel/index/editorcustomer",
        query: {
          record: record,
        },
      });
    },
    //删除客服
    delInfo(item) {
      this.$getListQp("customer/del", item.id).then((res) => {
        if (res.code === "000000") {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.success(res.msg);
        }
      });
    },
    searchClick() {
      this.listQuery.currentPage = 1;
      this.$getListQp("customer/getList", this.listQuery).then((res) => {
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.member-container {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  .public-header-wrap {
    margin-bottom: 20px;
  }
  .btn-one {
    margin-right: 20px;
  }
  .member-top {
    // display: flex;
    width: 100%;
    padding-bottom: 20px;
    justify-content: space-between;
    .search {
      display: inline-block;
      width: 250px;
      margin: 0 10px;
    }
  }
  .member-filterall {
    border: 1px solid #e0e0e0;
    width: 100%;
    background-color: #fafafa;
    .member-filter {
      display: flex;
      width: 100%;
      border: 1px solid #e0e0e0;
      background-color: #fafafa;
      margin-top: -1px;
      margin-left: -1px;
      padding: 20px;
      .div-input100 {
        display: inline-block;
        width: 100px;
      }
      .left5 {
        margin-left: 5px;
      }
      > div {
        flex: 1;
        > div {
          margin-bottom: 20px;
        }
        > div:last-child {
          margin-bottom: 0;
        }
      }
      .filter-type {
        display: inline-block;
        width: 67px;
        height: 16px;
        color: #a3a3a3;
        font-size: 12px;
        text-align: left;
      }
      .registerDate {
        width: 320px;
        display: flex;
        align-items: center;
        > span {
          // min-width: 100px!important;
        }
        .date-picker {
          width: 120px;
        }
      }
    }
    .enter {
      text-align: right;
      padding: 10px 0;
      padding-right: 30px;
      button {
        margin-right: 10px;
      }
    }
  }
  .member-contenttable {
    .status {
      font-size: 12px;
      color: #ffffff;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 18px;
    }
    .status0 {
      background-color: #ccc;
    }
    .status1 {
      background-color: #16b841;
    }
  }
}
</style>
