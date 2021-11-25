<template>
  <div class="information">
    <div class="box-wrap">
      <a-space>
        <a-button type="primary" @click="addinform">
          + 新建产品
        </a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item :key="v.id" v-for="v in data" :value="v.id">
              {{ v.id }}
            </a-menu-item>
          </a-menu>
          <a-button> 产品ID <a-icon type="down" /> </a-button>
        </a-dropdown>
        <div>
          <a-input placeholder="搜索关键词" />
        </div>
        <a-button type="primary">
          查询
        </a-button>
      </a-space>
    </div>
    <div class="InformationList">
      <div>
        <a-table
          :columns="columns"
          :data-source="exhibitList"
          rowKey="id"
          :pagination="paginationProps"
          tableLayout="auto"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <p slot="action" slot-scope="v">
            <a-button type="link" @click="editPool(v)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="delectPool(v.id)">
              删除
            </a-button>
          </p>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSizeOptions: ["5", "10", "20", "30"],
      current: 1,
      pageSize: 5,
      PoolList: [],
      exhibitList: [],
      columns: [
        {
          title: "资源池产品ID",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "资源池产品名称",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "资源池产品CODE",
          dataIndex: "productCode",
          key: "productCode"
        },
        {
          title: "供应商",
          dataIndex: "supplierName",
          key: "supplierName",
          scopedSlots: { customRender: "supplierName" }
        },
        {
          title: "供应商产品CODE",
          dataIndex: "supplierProductCode",
          key: "supplierProductCode",
          scopedSlots: { customRender: "supplierProductCode" }
        },
        {
          title: "供应商产品Type",
          dataIndex: "supplierProductType",
          key: "supplierProductType"
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1,  //当前页
        pageSize: 5,  //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.current} /  ${this.pageNum} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },

  computed: {
    // 共几页
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
    // 获取列表数据  以及初始化操作
    this.$store.dispatch("pool/getList").then(val => {
      this.PoolList = val.data.list;
      this.data = this.PoolList;
      this.paginationProps.total = this.data.length;
      this.paginationProps.current = this.current;
      // console.log(this.data);
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
    });
  },
  methods: {
    delectPool(id) {   //删除方法
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("pool/delList", id).then(val => {
            this.$message.success("操作成功");
            this.$store.dispatch("pool/getList").then(val => {
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
            });
          });
        }
      });
    },
    addinform() {   //添加资源池产品，跳转至添加页面路由
      this.$router.push("/production/product/addproduct");
    },
    handleMenuClick(e) {
      // console.log("click", e);
    },
    // 切换页码之后被调用
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.pageSize = pageSize;
      this.current = current;
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      console.log(this.paginationProps.pageSize, "pageSize");
      this.$store.dispatch("pool/getList").then(val => {
        this.PoolList = val.data.list;
        this.data = this.PoolList;
        this.paginationProps.total = this.data.length;
        this.paginationProps.current = this.current;
        // console.log(this.data);
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
      });
    },
    // 切换pagSize之后被调用
    changepage(page, pageSize) {
      console.log(page, pageSize, "-------");
      if (page == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(
          this.pageSize * (page - 1),
          this.pageSize * page
        );
      }
      // this.exhibitList = this.PoolList.slice(page, pageSize);
      this.current = page;
      this.paginationProps.current = page;
    },
    // 跳转至修改页面
    editPool(v) {
      // console.log(v);
      this.$router.push({
        path: "/production/product/editproduct",
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
  .box-wrap {
    width: 100%;
    height: 60px;
    padding-left: 16px;
  }
  .InformationList {
    padding: 0 16px;
  }
}
</style>
