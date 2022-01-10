<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="正常">
            <div class="public-header-wrap">
              <a-form-model layout="inline" :model="listQuery">
                <!-- 下拉框 -->
                <a-form-model-item>
                  <a-select
                    style="width:120px"
                    allowClear
                    v-model="listQuery.key"
                    placeholder="请选择"
                  >
                    <a-select-option
                      v-for="item in columnsArr"
                      :key="item.dataIndex"
                      :value="item.dataIndex"
                    >
                      {{ item.title }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
                <!-- 搜索 -->
                <a-form-model-item>
                  <a-input
                    v-model="listQuery.search"
                    allow-clear
                    placeholder="搜索关键词"
                  />
                </a-form-model-item>
                <!-- 按钮 -->
                <a-form-model-item>
                  <a-button type="primary" @click="search">
                    查询
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
            <!-- 表格 -->
            <a-table
              :loading="tableLoading"
              :columns="columns"
              :data-source="data"
              :rowKey="(record) => record.ecsBaseInfoResDto.ecsProductStockId"
              :pagination="paginationProps"
              :scroll="{ x: 2100 }"
            >
              <a
                slot="action"
                slot-scope="text, record"
                @click="addChannel(record.ecsBaseInfoResDto.ecsProductStockId)"
              >
                管理
              </a>
            </a-table>
          </a-tab-pane>
          <!-- <a-tab-pane key="2" tab="即将到期" force-render>
            Content of Tab Pane 2
          </a-tab-pane>
          <a-tab-pane key="3" tab="已到期">
            Content of Tab Pane 3
          </a-tab-pane>
          <a-tab-pane key="4" tab="已删除">
            Content of Tab Pane 3
          </a-tab-pane> -->
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        key: "ip",
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 0,
        ecsQueryReqDto:{}
      },
      columns: [
        {
          title: "实例ID",
          width: 100,
          dataIndex: "ecsBaseInfoResDto.ecsProductStockId",
          fixed: "left",
        },
        {
          title: "IP",
          width: 100,
          dataIndex: "publicIp",
          key: "publicIp",
          fixed: "left",
        },
        // { title: "弹性IP", dataIndex: "intranetIp", key: "intranetIp" },
        { title: "共享类型", dataIndex: "shareType", key: "shareType" },
        { title: "区域", dataIndex: "ecsBaseInfoResDto.region", key: "zoneId" },
        { title: "CPU", dataIndex: "cpu", key: "cpu" },
        { title: "内存", dataIndex: "memory", key: "memory" },
        {
          title: "磁盘",
          dataIndex: "dataDiskSize",
        },
        {
          title: "带宽",
          dataIndex: "internetMaxBandwidthOut",
          key: "internetMaxBandwidthOut",
        },
        {
          title: "隶属渠道商",
          dataIndex: "ecsBaseInfoResDto.channelName",
          key: "ecsBaseInfoResDto.channelCode",
        },
        // {
        //   title: "企业ID",
        //   dataIndex: "ecsProductOrderLogResDtoList[0].id",
        //   key: "ecsProductOrderLogResDtoList[0].id"
        // },
        {
          title: "实例创建时间",
          dataIndex: "creationTime",
          key: "ecsProductOrderLogResDtoList.createTime",
        },
        {
          title: "实例到期时间",
          dataIndex: "expiredTime",
          key: "ecsProductOrderLogResDtoList[0].modifyTime",
        },
        // { title: "实例状态", dataIndex: "", key: "" },
        { title: "运行状态", dataIndex: "status", key: "" },
        // { title: "操作状态", dataIndex: "", key: "" },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" },
        },
      ],
      columnsArr: [
        {
          title: "IP",
          dataIndex: "ip",
          key: "ip",
        },
        // { title: "区域", dataIndex: "ecsBaseInfoResDto.region", key: "zoneId" },
        // { title: "弹性IP", dataIndex: "intranetIp", key: "intranetIp" },
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.pageNo} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
      tableLoading: false,
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    // 查询
    search() {
      console.log(this.listQuery);
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("instance/getList", this.listQuery)
        .then((res) => {
          // console.log(res);
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 表格分页快速跳转n页
    quickJump(pageNo) {
      this.listQuery.pageNo = pageNo;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.pageNo = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    //
    addChannel(record) {
      console.log(record);
      this.$router.push({
        path: "/business/cloudservers/adds",
        query: { id: record },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-header-wrap {
    padding-bottom: 10px;
  }
}
</style>
