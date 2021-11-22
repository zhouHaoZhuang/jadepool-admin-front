<template>
  <div class="channel-list-detail">
    <div class="tabs">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="渠道详情">
          <div class="tabs-content">
            <div class="top-title">
              <span>基础资料</span>
              <div class="update">修改基础资料</div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="开放平台信息">
          Content of Tab Pane 2
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // tabs切换回调
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-detail {
  margin-top: -24px;
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .top-title{
      display: flex;
      justify-content: space-between;
      padding: 15px;
      padding-left: 30px;
      span{
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
</style>
<style lang="less">
.channel-list-detail {
  .ant-tabs-bar {
    background: #fff;
    border-bottom: none !important;
    padding-left: 24px;
  }
}
</style>
