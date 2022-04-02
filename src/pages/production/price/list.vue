<template>
  <div class="information">
    <div class="box-wrap">
      <a-space>
        <a-button type="primary" @click="addPrice">
          + 新建价格
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
            <a-space>
              <a-button type="link" @click="toDetail(v)">
                详情
              </a-button>
              <a-button type="link" @click="editPrice(v)">
                编辑
              </a-button>

              <a-button type="link" @click="delectPool(v.id)">
                删除
              </a-button>
            </a-space>
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
          title: "产品CODE",
          dataIndex: "productCode",
          key: "productCode"
        },
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName"
        },
        {
          title: "产品分类",
          dataIndex: "productType",
          key: "productType"
        },
        {
          title: "供应商",
          dataIndex: "supplierName",
          key: "supplierName",
          scopedSlots: { customRender: "supplierName" }
        },
        {
          title: "计费单位",
          dataIndex: "chargingType",
          key: "chargingType",
          scopedSlots: { customRender: "chargingType" }
        },
        {
          title: "所属地域",
          dataIndex: "area",
          key: "area"
        },
        {
          title: "标准单价",
          dataIndex: "unitPrice",
          scopedSlots: { customRender: "unitPrice" }
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
    //删除
    delectPool(id) {
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
    // 跳转至新增页面
    addPrice() {
      this.$router.push("/production/price/addPrice");
    },
    // 跳转至修改页面
    editPrice(v) {
      // console.log(v);
      this.$router.push({
        path: "/production/price/updatePrice",
        query: {
          id: v.id
        }
      });
    },
    //跳转详情页
    toDetail(v) {
      this.$router.push({
        path: "/production/price/priceDetail",
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
