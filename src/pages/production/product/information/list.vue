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
        <div>
          <div>P00001</div>
          <div>游戏安全盒子</div>
          <div>game</div>
          <div>阿里云（aliyun）</div>
          <div>ecs</div>
          <div></div>
          <div>游戏盒子专用账号</div>
          <div><a>编辑</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a>删除</a></div>
        </div>
      </div>
      <div>
        <span>
          共400条记录第1/80页
        </span>
        <a-pagination
          size="small"
          :total="50"
          show-size-changer
          show-quick-jumper
        />
      </div>
    </div>
    <!-- <addproduct class="addproduct" v-show="isshow"></addproduct> -->
  </div>
</template>

<script>
// import addproduct from './addproduct.vue'
export default {
  name: "index",
  data() {
    return {
      isshow: false
    };
  },
  components: {
    // addproduct
  },
  methods: {
    addinform() {
      this.$router.push("/production/product/addproduct");
    },
    handleMenuClick(e) {
      console.log("click", e);
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
