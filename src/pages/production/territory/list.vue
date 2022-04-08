<template>
  <div class="information">
    <div class="box-wrap">
      <a-space>
        <a-button type="primary" @click="addArea">
          + 新建地域
        </a-button>
        <a-select
          style="width:150px"
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
        <div>
          <a-input
            placeholder="搜索关键词"
            allow-clear
            v-model="listQuery.search"
          />
        </div>
        <a-button type="primary" @click="handleMenuClick">
          查询
        </a-button>
      </a-space>
    </div>
    <div class="InformationList">
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :loading="tableLoading"
          :pagination="paginationProps"
          :scroll="{ x: 1300 }"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <div slot="action" slot-scope="v">
            <a-button type="link" @click="editArea(v)">
              编辑
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link" @click="delectArea(v.id)">
              删除
            </a-button>
          </div>
        </a-table>
      </div>
    </div>
    <AreaOption
      v-model="showOption"
      :title="title"
      @success="reqList"
      :detailInfo="areaDetail"
    />
  </div>
</template>

<script>
import AreaOption from "@/components/territory/areaOption.vue";
export default {
  components: { AreaOption },
  data() {
    return {
      pageSizeOptions: ["5", "10", "20", "30"],
      current: 1,
      pageSize: 5,
      PoolList: [],
      exhibitList: [],
      tableLoading: false,
      data: [],
      title: "",
      showOption: false, // 是否显示地域弹框
      areaDetail: {}, //地域详情
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "地域CODE",
          dataIndex: "regionCode",
          key: "regionCode",
          width: 250
        },
        {
          title: "地域名称",
          dataIndex: "regionName",
          key: "regionName"
        },
        {
          title: "供应商",
          dataIndex: "supplierName",
          key: "supplierName",
          scopedSlots: { customRender: "supplierName" }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
      ],
      columns2: [],
      sechKey: "",
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },

  computed: {
    // 共几页
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

  activated() {
    this.reqList();
  },
  methods: {
    reqList() {
      this.tableLoading = true;
      this.$getListQp("territory/getList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    delectArea(id) {
      //删除方法
      this.$confirm({
        title: "是否确认删除该地域？",
        onOk: () => {
          this.$store.dispatch("territory/del", id).then(val => {
            this.$message.success("删除成功");
            this.reqList();
          });
        }
      });
    },
    handleMenuClick() {
      this.listQuery.currentPage = 1;
      this.reqList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.reqList();
    },
    // 切换pagSize之后被调用
    changepage(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.reqList();
    },
    // 新增地域
    addArea() {
      this.showOption = true;
      this.title = 1;
      this.areaDetail = {};
    },
    // 跳转至修改页面
    editArea(v) {
      this.$store.dispatch("territory/getId", v.id).then(res => {
        this.areaDetail = res.data;
      });
      this.showOption = true;
      this.title = 2;
    }
  }
};
</script>

<style lang="less" scoped>
.information {
  position: relative;
  padding-bottom: 150px;
  background-color: #fff;
  margin: 0 24px;
  padding: 20px;
  .box-wrap {
    width: 100%;
    height: 60px;
    padding-left: 16px;
  }
  .InformationList {
    padding: 0 16px;
  }
}
</style>
