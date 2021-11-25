<template>
  <div>
    <div class="enterprise-list-container">
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
                v-for="item in columns.slice(0, columns.length - 1)"
                :key="item.dataIndex"
                :value="item.dataIndex"
              >
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="搜索关键词" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="search">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="public-table-wrap">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="paginationProps"
          :scroll="{ x: 1300 }"
        >
          <div class="status" slot="certificationStatus" slot-scope="text">
            <div v-if="text === 0" class="dot"></div>
            <div v-else class="dot dot-err"></div>
            {{ certificationStatusEnum[text] }}
          </div>
          <div class="status" slot="corporationStatus" slot-scope="text">
            <div v-if="text === 0" class="dot"></div>
            <div v-else class="dot dot-default"></div>
            {{ corporationStatusEnum[text] }}
          </div>
          <span slot="createTime" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="goDetail(record)">
              查看
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="handleFrozen(record)">
              {{ record.corporationStatus === 0 ? "冻结" : "解冻" }}
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { certificationStatusEnum, corporationStatusEnum } from "@/utils/enum";
export default {
  data() {
    return {
      certificationStatusEnum,
      corporationStatusEnum,
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "企业ID",
          dataIndex: "id",
          key: "id",
          width: 250
        },
        {
          title: "企业名称",
          dataIndex: "corporationName",
          key: "corporationName"
        },
        {
          title: "认证状态",
          dataIndex: "certificationStatus",
          key: "certificationStatus",
          scopedSlots: { customRender: "certificationStatus" }
        },
        {
          title: "所属渠道商",
          dataIndex: "channelCustomerName",
          key: "channelCustomerName"
        },
        {
          title: "渠道商ID",
          dataIndex: "channelCustomerCode",
          key: "channelCustomerCode"
        },
        {
          title: "企业状态",
          dataIndex: "corporationStatus",
          key: "corporationStatus",
          scopedSlots: { customRender: "corporationStatus" }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 250,
          scopedSlots: { customRender: "createTime" }
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
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("channel/getEnterpriseList", {
          ...this.listQuery,
          [`qp-${this.listQuery.key}-like`]: this.listQuery.search
        })
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 表格分页快速跳转n页
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
    // 查看
    goDetail(record) {
      this.$router.push({
        path: "/channel/enterprise/detail",
        query: { id: record.id }
      });
    },
    // 冻结
    handleFrozen(record) {
      const corporationStatus = record.corporationStatus === 0 ? 1 : 0;
      this.$store
        .dispatch("channel/updateEnterpriseStatus", {
          id: record.id,
          corporationStatus
        })
        .then(res => {
          this.$message.success("操作成功");
          const index = this.data.findIndex(ele => ele.id === record.id);
          this.data.splice(index, 1, { ...res.data });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-table-wrap {
    .status {
      display: flex;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: green;
        margin-right: 5px;
      }
      .dot-err {
        background: red;
      }
      .dot-default {
        background: #ccc;
      }
    }
  }
}
</style>
