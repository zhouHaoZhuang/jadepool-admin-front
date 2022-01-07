<template>
  <div class="cloud-container">
    <!-- 头部筛选 -->
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-select
            style="width:120px"
            allowClear
            v-model="listQuery.key"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in columns.slice(0, columns.length - 3)"
              :key="item.dataIndex"
              :value="item.dataIndex"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.search"
            allow-clear
            placeholder="搜索关键词"
          />
        </a-form-model-item>
        <!-- <a-form-model-item>
          <a-select
            style="width:120px"
            allowClear
            v-model="listQuery.status"
            placeholder="状态"
          >
            <a-select-option
              v-for="(value, key) in runningStatusSelect"
              :key="key"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item> -->
        <a-form-model-item>
          <a-range-picker
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="onChange"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleSearch">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="table">
      <a-table
        rowKey="orderNo"
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        :pagination="paginationProps"
      >
        <!-- 状态 -->
        <div slot="runningStatus" slot-scope="text">
          {{ runningStatusEnum[text] }}
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { runningStatusEnum, runningStatusSelect } from "@/utils/enum";
import moment from "moment";
export default {
  data() {
    return {
      runningStatusEnum,
      runningStatusSelect,
      listQuery: {
        key: undefined,
        search: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      data: [],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "用户ID",
          dataIndex: "customerCode",
        },
        {
          title: "服务器",
          dataIndex: "innerInstanceId",
        },
        {
          title: "创建时间",
          dataIndex: "createTimeStr",
          sorter: (a, b) => moment(a.createTimeStr) - moment(b.createTimeStr),
        },
        {
          title: "到期时间",
          dataIndex: "expireTimeStr",
          sorter: (a, b) => moment(a.expireTimeStr) - moment(b.expireTimeStr),
        },
        {
          title: "执行时间",
          dataIndex: "modifyTimeStr",
          sorter: (a, b) => moment(a.modifyTimeStr) - moment(b.modifyTimeStr),
        },
        // {
        //   title: "状态",
        //   dataIndex: "runningStatus",
        //   scopedSlots: { customRender: "runningStatus" }
        // }
      ],
      paginationProps: {
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onShowSizeChange: this.onShowSizeChange,
      },
      tableLoading: false,
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 获取服务器列表
    getList() {
      this.tableLoading = true;
      this.$getList("instance/cloudList", this.listQuery)
        .then((res) => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 点击搜索
    handleSearch() {
      this.getList();
    },
    // 点击复制
    handleCopy(txt) {
      this.$copyText(txt)
        .then(() => {
          this.$message.success("已成功复制到剪切板");
        })
        .catch(() => {
          this.$message.warning("复制失败");
        });
    },
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.listQuery.startTime = dateString[0];
      this.listQuery.endTime = dateString[1];
    },
  },
};
</script>

<style lang="less" scoped>
.cloud-container {
  background: #fff;
  margin: 24px;
  margin-top: 0;
  padding: 24px;
  .table {
    color: #4d4d4d;
    margin-top: 15px;
    .copy-icon {
      color: #00aaff;
      cursor: pointer;
    }
    .status {
      color: #29cc7a;
      display: flex;
      align-items: center;
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #29cc7a;
        margin-right: 5px;
      }
    }
    .start {
      color: #29cc7a;
      .dot {
        background: #29cc7a;
      }
    }
    .stop {
      color: red;
      .dot {
        background: red;
      }
    }
    .hole {
      color: #000;
      .dot {
        background: #000;
      }
    }
    .overdue {
      color: #666;
      .dot {
        background: #666;
      }
    }
  }
}
</style>
