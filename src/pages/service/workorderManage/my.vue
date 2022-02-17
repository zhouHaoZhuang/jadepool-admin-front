<template>
  <div class="work-my-container">
    <a-tabs @change="handleChangeStatus">
      <a-tab-pane v-for="item in tabsList" :key="item.key" :tab="item.title" />
    </a-tabs>
    <!-- 表格 -->
    <PublicTable :tabsKey="tabsKey" type="my" />
  </div>
</template>

<script>
import PublicTable from "@/components/WorkOrder/PublicTable/index.vue";
export default {
  components: {
    PublicTable
  },
  data() {
    return {
      tabsKey: 0,
      tabsList: [
        {
          key: 0,
          title: "全部"
        },
        {
          key: 2,
          title: "处理中"
        },
        {
          key: 1,
          title: "未处理"
        },
        {
          key: 3,
          title: "已解决"
        },
        {
          key: 4,
          title: "移交工单"
        }
      ]
    };
  },
  methods: {
    // 修改状态
    handleChangeStatus(key) {
      this.tabsKey = key;
    }
  }
};
</script>

<style lang="less" scoped>
.work-my-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
}
</style>
