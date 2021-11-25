<template>
  <div class="information">
    <div class="box-wrap">
      <a-button type="primary" @click="addinform">
        + 新建订单路由规则
      </a-button>
    </div>
    <div class="InformationList">
      <div>
        <a-table
          :columns="columns"
          :data-source="exhibitList"
          rowKey="id"
          :pagination="paginationProps"
          :scroll="{ x: 1300 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="action" slot-scope="v">
            <a-button type="link" @click="editPool(v)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="delectPool(v.id)">
              删除
            </a-button>
          </div>
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
      pageSizeOptions: ["5", "10", "20", "30"],
      current: 1,
      pageSize: 5,
      PoolList: [], //完整数据
      exhibitList: [], //表格数据
      columns: [
        {
          title: "渠道商ID",
          dataIndex: "cusomerCode",
          key: "cusomerCode",
        },
        {
          title: "渠道商简称",
          dataIndex: "createUserName",
          key: "createUserName",
        },
        {
          title: "采购账号ID",
          dataIndex: "accountCode",
          key: "accountCode",
        },
        {
          title: "所属供应商",
          dataIndex: "supplier",
          key: "supplier",
          scopedSlots: { customRender: "supplier" },
        },
        {
          title: "账号标识",
          dataIndex: "accountTag",
          key: "accountTag",
          scopedSlots: { customRender: "accountTag" },
        },
        {
          title: "供应商侧账号ID",
          dataIndex: "supplierAccountCode",
          key: "supplierAccountCode",
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [], //请求的数据
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1,
        pageSize: 5,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.current} /  ${this.pageNum} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },

  computed: {
    // 总页数
    pageNum() {
      if (this.PoolList.length / this.pageSize < 1) {
        return 1;
      } else {
        if (this.PoolList.length % this.pageSize == 0) {
          return this.PoolList.length / this.pageSize;
        } else {
          return (
            (this.PoolList.length - (this.PoolList.length % this.pageSize)) /
              this.pageSize +
            1
          );
        }
      }
    }
  },
  activated() {
    // 获取订单路由列表
    this.$store.dispatch("order/getList").then(val => {
        this.reqAfter(val)
    });
  },
  methods: {
    // 定义删除方法
    delectPool(id) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("order/delList", id).then(val => {
            this.$message.success("操作成功");
            this.$store.dispatch("order/getList").then(val => {
              this.reqAfter(val);
            });
          });
        }
      });
    },
    // 跳转至添加路由页面
    addinform() {
      this.$router.push("/production/cloudServer/newOrder");
    },
    handleMenuClick(e) {
    },
    // 分页器改变pageSize之后的回调
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.current = current;
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      this.$store.dispatch("order/getList").then(val => {
        this.reqAfter(val);
      });
    },
    reqAfter(val) {
      this.PoolList = val.data.list;
      this.data = this.PoolList;
      this.paginationProps.total = this.data.length;
      this.paginationProps.current = this.current;
      if (this.current == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(
          this.pageSize * (this.current - 1),
          this.pageSize * this.current
        );
        if (this.exhibitList.length == 0) {
          this.current--;
          this.paginationProps.current = this.current;
          this.exhibitList = this.PoolList.slice(
            this.pageSize * (this.current - 1),
            this.pageSize * this.current
          );
        }
      }
    },
    // 改变页码之后的回调
    changepage(page, pageSize) {
      if (page == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(
          this.pageSize * (page - 1),
          this.pageSize * page
        );
      }
      this.current = page;
      this.paginationProps.current = page;
    },
    // 跳转至修改数据路由
    editPool(v) {
      this.$router.push({
        path: "/production/cloudServer/changeOrder",
        query: {
          form: v.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.information {
  position: relative;
  padding-bottom: 150px;
  background-color: #fff;
  margin: 0 24px;
  padding: 20px;
  h4 {
    font-size: 20px;
    font-weight: 650;
    height: 28px;
    line-height: 28px;
    width: 100%;
    background-color: #fff;
  }
  .box-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 16px;
    background-color: #fff;
    > div {
      width: 240px;
      margin-right: 5px;
    }
    > button {
      margin-right: 5px;
    }
  }
  .addproduct {
    position: absolute;
    top: 0;
    left: 0;
  }
  .InformationList {
    background-color: #fff;
    padding: 0 16px;
    > div:nth-child(3) {
      width: 100%;
      height: 40px;
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      // margin-bottom: 200px;
    }
    > div:nth-child(2) {
      > div {
        display: flex;
        width: 100%;
        padding: 0 16px;
        height: 53px;
        border-bottom: 1px solid #000;
        > div {
          flex: 1;
          height: 53px;
          line-height: 53px;
        }
        > div:nth-child(8) {
          color: rgb(49, 104, 255);
        }
      }
    }
  }
}
</style>
