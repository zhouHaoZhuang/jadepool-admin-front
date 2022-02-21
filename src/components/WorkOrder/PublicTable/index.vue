<template>
  <div class="public-table-container">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            style="width:150px"
            allowClear
            v-model="listQuery.key"
            placeholder="请选择"
          >
            <a-select-option value="title">
              标题
            </a-select-option>
            <a-select-option value="workOrderNo">
              工单编号
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.search"
            allowClear
            placeholder="搜索关键词"
          />
        </a-form-model-item>
        <a-form-model-item label="时间类型">
          <a-select
            style="width:150px"
            allowClear
            v-model="listQuery.timeType"
            placeholder="请选择时间类型"
          >
            <a-select-option :value="1">创建时间 </a-select-option>
            <a-select-option :value="2">接单时间 </a-select-option>
            <a-select-option :value="3">完成时间 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-range-picker
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [
                moment('00:00:00', 'HH:mm:ss'),
                moment('11:59:59', 'HH:mm:ss')
              ]
            }"
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="datePickerOnOk"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="search">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="table-content">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
      >
        <!-- 进度 -->
        <div slot="schedule" slot-scope="text">
          <a-tag v-if="text === 1">
            等待回复
          </a-tag>
          <a-tag v-if="text === 2" color="blue">
            第三方已回复
          </a-tag>
          <a-tag v-if="text === 3" color="green">
            已回复
          </a-tag>
        </div>
        <!-- 问题内容 -->
        <div slot="title1" slot-scope="text, record">
          <a-button
            class="btn-link"
            v-permission="'modify'"
            type="link"
            @click="handleJumpDetail(record)"
          >
            {{ text }}
          </a-button>
        </div>
        <!-- 提交人 -->
        <div slot="submitName" slot-scope="text">
          <a-button class="btn-link" type="link">
            {{ text }}
          </a-button>
        </div>
        <!-- 提交时间 -->
        <div slot="createTime" slot-scope="text">
          {{ text | formatDate }}
        </div>
        <!-- 关闭状态 -->
        <div slot="status" slot-scope="text">
          <a-tag v-if="text === 1">
            待接单
          </a-tag>
          <a-tag v-if="text === 2" color="blue">
            接单处理中
          </a-tag>
          <a-tag v-if="text === 3" color="green">
            处理完成
          </a-tag>
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            v-permission="'modify'"
            type="link"
            @click="handleJumpDetail(record)"
          >
            管理
          </a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    // tabs标签的key(筛选状态)
    tabsKey: {
      type: Number,
      default: -1
    },
    // 区分是工单列表(list)还是我的工单列表(my)
    type: {
      type: String,
      default: "list"
    }
  },
  data() {
    return {
      moment,
      listQuery: {
        key: undefined,
        search: "",
        questionCategoryCode: undefined,
        timeType: undefined,
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "进度",
          dataIndex: "schedule",
          scopedSlots: { customRender: "schedule" }
        },
        {
          title: "问题内容",
          dataIndex: "title",
          scopedSlots: { customRender: "title1" }
        },
        {
          title: "问题分类",
          dataIndex: "questionCategoryName"
        },
        {
          title: "提交人",
          dataIndex: "submitName",
          scopedSlots: { customRender: "submitName" }
        },
        {
          title: "提交时间",
          dataIndex: "createTime",
          scopedSlots: { customRender: "createTime" }
        },
        {
          title: "关闭状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "接单人",
          dataIndex: "acceptName"
        },
        {
          title: "评分",
          dataIndex: "totalPoint"
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      reqObj: {
        0: "workorder/myWorkOrderList",
        1: "workorder/myWorkOrderList1",
        2: "workorder/myWorkOrderList2",
        3: "workorder/myWorkOrderList",
        4: "workorder/myWorkOrderList4"
      }
    };
  },
  watch: {
    tabsKey: {
      handler() {
        this.getList();
      }
    }
  },
  activated() {
    this.getList();
  },
  methods: {
    // 搜索
    search() {
      this.getList();
    },
    // 根据时间类型返回不同参数
    getReq(type, listQuery) {
      if (!type) return {};
      if (type === 1) {
        return {
          createTimeGe: listQuery.startTime,
          createTimeLe: listQuery.endTime
        };
      }
      if (type === 2) {
        return {
          acceptTimeGe: listQuery.startTime,
          acceptTimeLe: listQuery.endTime
        };
      }
      if (type === 3) {
        return {
          endTimeGe: listQuery.startTime,
          endTimeLe: listQuery.endTime
        };
      }
    },
    // 查询工单列表
    getList() {
      this.tableLoading = true;
      // 根据不同type处理不同的请求地址
      // 默认请求
      let req = "workorder/workOrderList";
      if (this.type === "my") {
        req = this.reqObj[this.tabsKey];
      }
      // 根据不同type处理不同的请求参数-status
      const status =
        this.type === "list"
          ? this.tabsKey === 0
            ? undefined
            : this.tabsKey
          : undefined;
      const timeObj = this.getReq(this.listQuery.timeType, this.listQuery);
      const newListQuery = {
        ...this.listQuery,
        ...timeObj,
        status
      };
      this.$getList(req, newListQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 日期选择
    datePickerOnOk(value) {
      if (value.length !== 0) {
        this.listQuery.startTime = moment(value[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.listQuery.endTime = moment(value[1]).format("YYYY-MM-DD HH:mm:ss");
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
    },
    // 表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 跳转详情
    handleJumpDetail(record) {
      this.$router.push({
        path: "/service/workorderManage/detail",
        query: { workOrderNo: record.workOrderNo }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.public-table-container {
  .table-content {
    margin-top: 16px;
  }
  .btn-link {
    padding: 0;
  }
}
</style>
