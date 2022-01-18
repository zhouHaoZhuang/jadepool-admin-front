<template>
  <div class="public-box">
    <div class="public-title">
      <div class="left-tit">已授权用户</div>
      <a-space>
        <a-button v-if="selectedRowKeys.length > 0" @click="cancelAuthUser"
          >取消授权</a-button
        >
        <a-button type="primary" @click="handleAdd">添加授权</a-button>
      </a-space>
    </div>
    <div class="public-con">
      <div class="table-box">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <span slot="lastLogin" slot-scope="text">
            {{ text | formatDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <!-- <a-button type="link" @click="handleGoDetail(record)">
              详情
            </a-button>
            <a-divider type="vertical" /> -->
            <a-button type="link" @click="handleDel(record)">
              取消授权
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 添加授权弹窗 -->
    <a-modal
      :visible="visible"
      width="780px"
      centered
      title="添加用户"
      wrapClassName="add-auth-user"
      okText="确定"
      :confirmLoading="loading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-spin style="width:100%" :spinning="userLoading">
        <a-transfer
          :rowKey="record => record.id"
          :data-source="userData"
          :list-style="{
            height: '500px'
          }"
          show-search
          :filter-option="filterOption"
          :target-keys="targetKeys"
          :render="item => item.username"
          @change="handleChange"
        />
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    // 角色code
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "用户信息",
          dataIndex: "username"
        },
        {
          title: "手机号",
          dataIndex: "phone"
        },
        // {
        //   title: "邮箱",
        //   dataIndex: "desacription"
        // },
        {
          title: "最后登录时间",
          dataIndex: "lastLogin",
          scopedSlots: { customRender: "lastLogin" }
        },
        {
          title: "登录次数",
          dataIndex: "loginsCount"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      tableLoading: false,
      selectedRowKeys: [],
      // 弹窗
      visible: false,
      loading: false,
      // 穿梭框
      userData: [],
      userLoading: false,
      targetKeys: []
    };
  },
  watch: {
    code: {
      handler(newVal) {
        if (newVal) {
          this.getAuthUserList();
        }
      },
      immediate: true
    },
    visible: {
      handler(newVal) {
        if (newVal) {
          this.getAllUserList();
        }
      }
    }
  },
  methods: {
    // 表格多选
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 查询已授权用户列表
    getAuthUserList() {
      this.tableLoading = true;
      this.$store
        .dispatch("system/getAuthUserList", { code: this.code })
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 查询所有用户列表
    getAllUserList() {
      this.userLoading = true;
      this.$store
        .dispatch("system/getModalUserList", {
          currentPage: 1,
          pageSize: 100
        })
        .then(res => {
          this.userData = [...res.data.list];
        })
        .finally(() => {
          this.userLoading = false;
        });
    },
    // 添加授权
    handleAdd() {
      this.visible = true;
    },
    // 穿梭框
    // 搜索过滤函数
    filterOption(inputValue, option) {
      return option.username.indexOf(inputValue) > -1;
    },
    // 穿梭框change事件
    handleChange(targetKeys, direction, moveKeys) {
      this.targetKeys = [...targetKeys];
    },
    // 关闭弹窗
    handleCancel() {
      this.visible = false;
    },
    // 弹窗提交
    handleOk() {
      if (this.targetKeys.length === 0) {
        this.$message.warning("请先勾选需要授权的用户");
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("system/addAuthUser", {
          code: this.code,
          userIds: [...this.targetKeys]
        })
        .then(res => {
          this.$message.success("授权成功");
          this.targetKeys = [];
          this.getAuthUserList();
          this.visible = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 批量取消授权
    cancelAuthUser() {
      this.$confirm({
        title: "确认要批量取消授权吗？",
        onOk: () => {
          this.$store
            .dispatch("system/cancelAuthUser", {
              code: this.code,
              userIds: [...this.selectedRowKeys]
            })
            .then(res => {
              this.$message.success("批量取消授权成功");
              this.getAuthUserList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.public-box {
  box-shadow: 0 6px 12px 0 #fbfcfd;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 24px;
  .public-title {
    height: 65px;
    padding: 0 32px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-tit {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .public-con {
    padding: 24px 32px;
    display: flex;
    flex-wrap: wrap;
    .table-box {
      width: 100%;
    }
  }
}
</style>
<style lang="less">
.add-auth-user {
  .ant-transfer-list {
    width: 346px;
  }
}
</style>
