<template>
  <div class="information">
    <h4>产品信息管理</h4>
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
        <span>资源池产品ID</span><span>资源池产品名称</span
        ><span>资源池产品CODE</span><span>供应商</span
        ><span>供应商产品Code</span><span>供应商产品Type</span><span>备注</span
        ><span>操作</span>
      </div>
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
        <div v-for="(v, i) in exhibitList" :key="i" :id="v.ResourcePoolId">
          <div>{{ v.ResourcePoolId }}</div>
          <div>{{ v.ResourcePoolName }}</div>
          <div>{{ v.ResourcePoolCode }}</div>
          <div>{{ v.SupplierName }}</div>
          <div>{{ v.SupplierCode }}</div>
          <div>{{ v.SupplierType }}</div>
          <div>{{ v.Remark }}</div>
          <div>
            <a @click="editPool(v)">编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
              @click="delectPool"
              >删除</a
            >
          </div>
        </div>
      </div>
      <div>
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
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-if="props.value === '50'">全部</span>
          </template></a-pagination
        >
      </div>
    </div>
    <!-- <addproduct class="addproduct" v-show="isshow"></addproduct> -->
  </div>
</template>

<script>
import { loadGuards } from "@/utils/routerUtil";
// import { loadGuards } from "@/utils/routerUtil";
// import addproduct from './addproduct.vue'
export default {
  name: "index",
  data() {
    return {
      pageSizeOptions: ["5", "10", "20", "30"],
      current: 1,
      pageSize: 5,
      PoolList: [
        {
          ResourcePoolId: "资源池1",
          ResourcePoolName: "腾讯游戏盒子",
          ResourcePoolCode: "腾讯",
          SupplierName: "腾讯云",
          SupplierCode: "esc",
          SupplierType: "云服务",
          pm: "腾讯云",
          Remark: "游戏盒子"
        },
        {
          ResourcePoolId: "资源池2",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        },
        {
          ResourcePoolId: "资源池3",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        },
        {
          ResourcePoolId: "资源池4",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        },
        {
          ResourcePoolId: "资源池5",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        },
        {
          ResourcePoolId: "资源池6",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        },
        {
          ResourcePoolId: "资源池7",
          ResourcePoolName: "华为云盒子",
          ResourcePoolCode: "huawei",
          SupplierName: "华为云",
          SupplierCode: "huawei",
          SupplierType: "华为云服务",
          pm: "华为云",
          Remark: "华为云盒子"
        }
      ],
      exhibitList: []
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
    this.exhibitList = this.PoolList.slice(0, this.pageSize);
    // let addPool = this.$route.params.form;
    // console.log(addPool, "-----------");
  },
  activated() {
    let addPool = this.$route.query.form;
    if (addPool === "[object Object]") {
      return;
    }
    // console.log(addPool.ResourcePoolId, "-----------");

    if (addPool.ResourcePoolId) {
      let inx = this.PoolList.findIndex(function(params) {
        return params.ResourcePoolId === addPool.ResourcePoolId;
      });
      this.PoolList.splice(inx, 1, addPool);
      // console.log(this.PoolList, "this.PoolList");
      if (this.current == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(
          this.pageSize * (this.current - 1),
          this.pageSize * this.current
        );
        if (this.exhibitList.length == 0) {
          this.current--;
          this.exhibitList = this.PoolList.slice(
            this.pageSize * (this.current - 1),
            this.pageSize * this.current
          );
        }
      }
      return;
    }
    if (addPool) {
      addPool.ResourcePoolId = "资源池" + (this.PoolList.length + 1);
      this.PoolList.push(addPool);
    }
  },
  methods: {
    delectPool(e) {
      // console.log(e.path[2].id);
      const inx = this.exhibitList.findIndex(function(params) {
        return params.ResourcePoolId == e.path[2].id;
      });
      this.exhibitList.splice(inx, 1);
      const inx2 = this.PoolList.findIndex(function(params) {
        return params.ResourcePoolId == e.path[2].id;
      });
      this.PoolList.splice(inx2, 1);
      if (this.current == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(
          this.pageSize * (this.current - 1),
          this.pageSize * this.current
        );
        if (this.exhibitList.length == 0) {
          this.current--;
          this.exhibitList = this.PoolList.slice(
            this.pageSize * (this.current - 1),
            this.pageSize * this.current
          );
        }
      }
    },
    addinform() {
      this.$router.push("/production/product/addproduct");
    },
    handleMenuClick(e) {
      console.log("click", e);
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.exhibitList = this.PoolList.slice(current - 1, pageSize);
    },
    changepage(page, pageSize) {
      // console.log(page, pageSize, "-------");
      if (page == 1) {
        this.exhibitList = this.PoolList.slice(0, this.pageSize);
      } else {
        this.exhibitList = this.PoolList.slice(this.pageSize * (page - 1), this.pageSize * page);
      }
      // this.exhibitList = this.PoolList.slice(page, pageSize);
      this.current = page;
    },
    editPool(v) {
      this.$router.push({
        path: "/production/product/editproduct",
        query: {
          form: v
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
    > div:nth-child(1) {
      width: 100%;
      background-color: rgb(250, 250, 250);
      display: flex;
      padding: 16px;
      color: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 3px;
      > span {
        flex: 1;
        font-weight: 650;
        font-style: normal;
        font-size: 14px;
      }
    }
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
