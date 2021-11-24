<template>
  <div class="information">
    <div class="box-wrap">
      <a-button type="primary" @click="addinform">
        + 新建产品
      </a-button>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            1st item
          </a-menu-item>
          <a-menu-item key="2">
            2nd item
          </a-menu-item>
          <a-menu-item key="3">
            3rd item
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
    </div>
    <div class="InformationList">
      <div>
        <!-- <div>
          <div>P00001</div>
          <div>游戏安全盒子</div>
          <div>game</div>
          <div>阿里云（aliyun）</div>
          <div>ecs</div>
          <div></div>
          <div>游戏盒子专用账号</div>
          <div><a>编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a>删除</a></div>
        </div> -->
        <!-- <div v-for="(v, i) in exhibitList" :key="i" :id="v.id">
          <div>{{ v.productCode }}</div>
          <div>{{ v.productName }}</div>
          <div>{{ v.productCode }}</div>
          <div>{{ v.supplierName }}</div>
          <div>{{ v.supplierProductCode }}</div>
          <div>{{ v.supplierProductType }}</div>
          <div>{{ v.remark }}</div>
          <div>
            <a @click="editPool(v)">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
              @click="delectPool"
              >删除</a
            >
          </div>
        </div> -->
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
      <!-- <div>
        <span>
          共{{ PoolList.length }}条记录第{{ current }}/{{ pageNum }}页
        </span>
        <a-pagination
          size="small"
          :total="PoolList.length"
          v-model="current"
          :page-size-options="pageSizeOptions"
          show-quick-jumper
          showSizeChanger
          @change="changepage"
          :show-total="(total, range) => `第${range[0]}条--第${range[1]}条`"
          :page-size="pageSize"
          :default-current="1"
          @showSizeChange="onShowSizeChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value !== PoolList.length"
              >{{ props.value }}条/页</span
            >
            <span v-if="props.value === PoolList.length">全部</span>
          </template></a-pagination
        >
      </div> -->
    </div>
    <!-- <addproduct class="addproduct" v-show="isshow"></addproduct> -->
  </div>
</template>

<script>
import { loadGuards } from "@/utils/routerUtil";

export default {
  name: "index",
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
          key: "id",
          ellipsis: true
        },
        {
          title: "资源池产品名称",
          dataIndex: "productName",
          key: "productName",
          ellipsis: true
        },
        {
          title: "资源池产品CODE",
          dataIndex: "productCode",
          key: "productCode",
          ellipsis: true
        },
        {
          title: "供应商",
          dataIndex: "supplierName",
          key: "supplierName",
          scopedSlots: { customRender: "supplierName" },
          ellipsis: true
        },
        {
          title: "供应商产品CODE",
          dataIndex: "supplierProductCode",
          key: "supplierProductCode",
          scopedSlots: { customRender: "supplierProductCode" },
          ellipsis: true
        },
        {
          title: "供应商产品Type",
          dataIndex: "supplierProductType",
          key: "supplierProductType",
          ellipsis: true
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
          ellipsis: true
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
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
  created() {
    // let addPool = this.$route.params.form;
    // console.log(addPool, "-----------");
  },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   let addPool = to.query.form;
  //   // console.log(to, from, "-----------");
  //   if (from.name == "新建产品线") {
  //     console.log(addPool, "addPool");
  //     next(vm => {
  //       vm.PoolList.push(addPool);
  //       vm.exhibitList = vm.PoolList.slice(0, vm.pageSize);
  //     });
  //     return;
  //   }
  //   if (from.name == "编辑产品线") {
  //     next(vm => {
  //       let inx = vm.PoolList.findIndex(function(params) {
  //         return params.productCode === addPool.productCode;
  //       });
  //       vm.PoolList.splice(inx, 1, addPool);
  //       // console.log(this.PoolList, "this.PoolList");
  //       if (vm.current == 1) {
  //         vm.exhibitList = vm.PoolList.slice(0, vm.pageSize);
  //       } else {
  //         vm.exhibitList = vm.PoolList.slice(
  //           vm.pageSize * (vm.current - 1),
  //           vm.pageSize * vm.current
  //         );
  //         if (vm.exhibitList.length == 0) {
  //           vm.current--;
  //           vm.exhibitList = vm.PoolList.slice(
  //             vm.pageSize * (vm.current - 1),
  //             vm.pageSize * vm.current
  //           );
  //         }
  //       }
  //     });
  //   }
  //   next();
  // },
  activated() {
    this.$store.dispatch("pool/getList").then(val => {
      this.PoolList = val.data.list;
      this.data = this.PoolList;
      this.paginationProps.total = this.data.length;
      this.paginationProps.current = this.current;
      console.log(this.data);
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
    delectPool(id) {
      // console.log(id, "id");
      this.$store.dispatch("pool/delList", id).then(val => {
        // console.log(val);
        // code: "000000"
        this.$message.success("操作成功");
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
        // alert(val);
      });
    },
    addinform() {
      this.$router.push("/production/product/addproduct");
    },
    handleMenuClick(e) {
      // console.log("click", e);
    },
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
        console.log(this.data);
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
  // padding: 20px;
  width: 1220px;
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
    // > div:nth-child(1) {
    //   width: 100%;
    //   background-color: rgb(250, 250, 250);
    //   display: flex;
    //   padding: 16px;
    //   color: rgba(0, 0, 0, 0.85);
    //   border: 1px solid rgba(0, 0, 0, 0.15);
    //   border-radius: 3px;
    //   > span {
    //     flex: 1;
    //     font-weight: 650;
    //     font-style: normal;
    //     font-size: 14px;
    //   }
    // }
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
