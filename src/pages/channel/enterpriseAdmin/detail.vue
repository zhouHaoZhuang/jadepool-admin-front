<template>
  <div class="enterprise-list-detail">
    <div class="tabs-content">
      <div class="top-title">
        <span>基础资料</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">企业ID:</div>
          <div class="value">C00001</div>
        </div>
        <div class="item">
          <div class="label">企业名称:</div>
          <div class="value">xxxxxxxx公司</div>
        </div>
        <div class="item">
          <div class="label">认证状态:</div>
          <div class="value">公司</div>
        </div>
        <div class="item">
          <div class="label">所属渠道商:</div>
          <div class="value">www.baidu.com</div>
        </div>
        <div class="item">
          <div class="label">渠道商ID:</div>
          <div class="value">张三</div>
        </div>
        <div class="item">
          <div class="label">企业状态:</div>
          <div class="value">150150150150</div>
        </div>
        <div class="item">
          <div class="label">创建时间:</div>
          <div class="value">五</div>
        </div>
        <div class="item">
          <div class="label">最后更新时间:</div>
          <div class="value">五</div>
        </div>
        <div class="item">
          <div class="label">企业认证时间:</div>
          <div class="value">五</div>
        </div>
        <div class="item">
          <div class="label">备注:</div>
          <div class="value">五</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$store.dispatch("").then(res => {
        this.detail = { ...res.data };
      });
    }
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .top-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      padding-left: 30px;
      padding-right: 15px;
      border-bottom: 1px solid #ccc;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .update {
        padding: 5px 10px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
    .bot-content {
      padding: 20px 30px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .label {
          width: 120px;
          text-align: right;
          margin-right: 8px;
        }
        .value {
          flex: 1;
        }
      }
      .item-row {
        width: 100%;
      }
    }
  }
}
</style>
