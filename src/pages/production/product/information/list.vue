<template>
  <div class="information">
    <div class="box-wrap">
      <a-space>
        <a-button type="primary" @click="addinform">
          + 新建产品
        </a-button>
        <a-select
          style="width:150px"
          v-model="listQuery.key"
          :placeholder="title"
        >
          <a-select-option :key="i" v-for="(v, i) in columns2" :value="v.key">
            {{ v.title }}
          </a-select-option>
        </a-select>
        <div>
          <a-input
            placeholder="搜索关键词"
            allow-clear
            v-model="listQuery.search"
          />
        </div>
        <a-button type="primary" @click="handleMenuClick">
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
  data() {
    return {
      pageSizeOptions: ["5", "10", "20", "30"],
      current: 1,
      pageSize: 5,
      PoolList: [],
      exhibitList: [],
      title: "请选择",
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "资源池产品ID",
          dataIndex: "id",
          key: "id",
          width: 250
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
      columns2: [],
      data: [],
      sechKey: "",
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
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
    this.columns2 = this.columns.slice(0, this.columns.length - 1);
    // 获取列表数据  以及初始化操作
    this.$store.dispatch("pool/getList").then(val => {
      this.reqList(val);
    });
  },
  methods: {
    reqList(res) {
      this.PoolList = res.data.list;
      this.data = this.PoolList;
      this.paginationProps.total = res.data.totalCount * 1;
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

    delectPool(id) {
      //删除方法
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store.dispatch("pool/delList", id).then(val => {
            this.$message.success("操作成功");
            this.$store.dispatch("pool/getList").then(val => {
              this.reqList(val);
            });
          });
        }
      });
    },
    handleMenuClick() {
      this.$getListQp("pool/getList", this.listQuery).then(val => {
        this.reqList(val); //获取列表数据并初始化数据
      });
    },
    // 切换页码之后被调用
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.current = current;
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      this.$store.dispatch("pool/getList").then(val => {
        this.reqList(val);
      });
    },
    // 切换pagSize之后被调用
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
    addinform() {
      //添加资源池产品，跳转至添加页面路由
      this.$router.push("/production/product/updateProduct");
    },
    // 跳转至修改页面
    editPool(v) {
      // console.log(v);
      this.$router.push({
        path: "/production/product/updateProduct",
        query: {
          id: v.id
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
