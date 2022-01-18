<template>
  <div class="public-box">
    <div class="public-title">
      <div class="left-tit">已授权规则</div>
      <a-space>
        <a-button type="primary" @click="handleAdd">添加授权</a-button>
      </a-space>
    </div>
    <div class="public-con">
      <div class="table-box">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="code"
          :pagination="false"
        >
          <span slot="type">
            角色
          </span>
          <span slot="code" slot-scope="text">
            {{ text.replace(":*", "") }}
          </span>
          <div slot="actions" slot-scope="text">
            <div class="actions-box">
              <div v-for="ele in text" :key="ele" class="item">
                <a-tooltip v-if="ele === '*'" placement="top">
                  <template slot="title">
                    <span>所有操作</span>
                  </template>
                  <span>
                    {{ ele }}
                  </span>
                </a-tooltip>
                <span v-else>
                  {{ ele }}
                </span>
              </div>
            </div>
          </div>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="handleCancelAuth(record)">
              取消授权
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 添加授权弹窗 -->
    <a-modal
      :visible="visible"
      width="680px"
      centered
      title="添加授权"
      wrapClassName="add-auth-rule"
      okText="确定"
      :confirmLoading="loading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="被授权主体类型" prop="type">
          <a-radio-group v-model="form.type">
            <a-radio value="role">
              角色
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="被授权角色" prop="roleCodes">
          <a-select
            v-model="form.roleCodes"
            mode="multiple"
            style="width: 100%"
            placeholder="选择角色"
          >
            <a-select-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.code"
            >
              <div>{{ item.code }}</div>
              <div>{{ item.description }}</div>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item style="margin-bottom:0" label="授权规则">
          <a-button type="link" icon="plus" @click="handleAddRule">
            添加授权规则
          </a-button>
        </a-form-model-item>
        <div
          v-for="(item, index) in form.permissionActions"
          :key="item.id"
          class="actions-item"
        >
          <a-form-model-item
            label="权限"
            :prop="'permissionActions.' + index + '.permissionCode'"
            :rules="{
              required: true,
              message: '请选择权限',
              trigger: ['blur', 'change']
            }"
          >
            <a-select
              v-model="item.permissionCode"
              show-search
              placeholder="请选择权限"
              option-filter-prop="children"
              style="width: 100%"
              :filter-option="filterOption"
              @change="
                (value, opt) => selectChange(value, opt, item.type, index)
              "
            >
              <a-select-option value="all">
                <span>所有资源</span>
              </a-select-option>
              <a-select-option
                v-for="item in adminList"
                :key="item.id"
                :value="item.code"
              >
                <span>{{ item.code }}</span>
                <span>({{ item.description }})</span>
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="操作"
            :prop="'permissionActions.' + index + '.type'"
            :rules="{
              required: true,
              message: '请选择操作类型',
              trigger: ['blur', 'change']
            }"
          >
            <a-radio-group
              v-model="item.type"
              :disabled="!item.permissionCode || item.permissionCode === 'all'"
              @change="e => radioChange(e, item, index)"
            >
              <a-radio :value="1">
                所有操作
              </a-radio>
              <a-radio :value="0">
                特定操作
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item
            v-if="item.type === 0"
            :wrapper-col="{ span: 15, offset: 6 }"
          >
            <a-select
              v-model="item.actions"
              mode="multiple"
              show-search
              placeholder="请选择操作"
              option-filter-prop="children"
              style="width: 100%"
              :filter-option="filterOption"
            >
              <a-select-option
                v-for="ele in item.actionSelectList"
                :key="ele.name"
                :value="ele.name"
              >
                <span>{{ ele.name }}</span>
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-icon
            v-if="!item.default"
            class="close"
            type="close-circle"
            @click="handleDelRule(index)"
          />
        </div>
      </a-form-model>
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
    const validateRoleCodes = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请选择被授权角色"));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: "被授权主体类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "权限",
          dataIndex: "code",
          scopedSlots: { customRender: "code" }
        },
        {
          title: "权限描述",
          dataIndex: "desacription"
        },
        {
          title: "权限操作",
          dataIndex: "actions",
          scopedSlots: { customRender: "actions" }
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      tableLoading: false,
      // 添加授权
      visible: false,
      loading: false,
      roleList: [],
      adminList: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        type: "role",
        roleCodes: [],
        permissionActions: [
          {
            id: -1,
            permissionCode: undefined,
            type: 1,
            actions: [],
            default: true
          }
        ]
      },
      rules: {
        type: [
          {
            required: true,
            message: "请选择授权主体类型",
            tigger: ["change"]
          }
        ],
        roleCodes: [
          {
            validator: validateRoleCodes,
            tigger: ["change"]
          }
        ]
      }
    };
  },
  watch: {
    code: {
      handler(newVal) {
        if (newVal) {
          this.getAuthRuleList();
        }
      },
      immediate: true
    },
    visible: {
      handler(newVal) {
        if (newVal) {
          this.getRoleList();
          this.getAdminList();
          this.form.roleCodes = [this.code];
        } else {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  methods: {
    // 查询已授权规则列表
    getAuthRuleList() {
      this.tableLoading = true;
      this.$store
        .dispatch("system/getRuleList", {
          code: this.code
        })
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 添加授权弹窗---start
    // 添加授权
    handleAdd() {
      this.visible = true;
    },
    // 获取角色列表
    getRoleList() {
      this.$store
        .dispatch("system/getRoleList", {
          currentPage: 1,
          pageSize: 100
        })
        .then(res => {
          this.roleList = [...res.data.list];
        });
    },
    // 获取权限列表
    getAdminList() {
      this.$store
        .dispatch("system/getAdminList", {
          currentPage: 1,
          pageSize: 100,
          isAll: false
        })
        .then(res => {
          this.adminList = [...res.data.list];
        });
    },
    // 根据权限获取对应权限的所有操作
    getPremActions(id, index) {
      this.$store
        .dispatch("system/getPremActions", {
          id
        })
        .then(res => {
          this.form.permissionActions.splice(index, 1, {
            ...this.form.permissionActions[index],
            actionSelectList: [...res.data.actions]
          });
        });
    },
    // 权限切换change,需要请求数据
    selectChange(value, opt, type, index) {
      this.form.permissionActions[index].actions = [];
      this.form.permissionActions[index].actionSelectList = [];
      if (type === 0 && value !== "all") {
        this.getPremActions(value, index);
      }
      if (value === "all") {
        this.form.permissionActions[index].type = 1;
      }
    },
    // 操作单选change事件，选择特定操作需要请求数据
    radioChange(e, item, index) {
      if (e.target.value === 0) {
        this.getPremActions(item.permissionCode, index);
      }
      // 选择了所有操作，需要清空已选择的actios
      if (e.target.value === 1 && item.actions.length > 0) {
        this.form.permissionActions.splice(index, 1, {
          ...this.form.permissionActions[index],
          actions: []
        });
      }
    },
    // 权限下拉选择的搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].children[0].text.indexOf(input) >= 0
      );
    },
    // 关闭弹窗
    handleCancel() {
      this.visible = false;
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        type: "role",
        roleCodes: [],
        permissionActions: [
          {
            id: -1,
            permissionCode: undefined,
            type: 1,
            actions: [],
            actionSelectList: [],
            default: true
          }
        ]
      };
    },
    // 添加授权规则
    handleAddRule() {
      const id =
        this.form.permissionActions[this.form.permissionActions.length - 1].id -
        1;
      const data = {
        id,
        permissionCode: undefined,
        type: 1,
        actions: [],
        actionSelectList: [],
        default: false
      };
      this.form.permissionActions.push({ ...data });
    },
    // 删除授权规则
    handleDelRule(index) {
      this.form.permissionActions.splice(index, 1);
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("system/addRule", this.form)
            .then(res => {
              this.$message.success("授权成功");
              this.getAuthRuleList();
              this.visible = false;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 添加授权弹窗---end
    // 取消授权
    handleCancelAuth(record) {
      this.$confirm({
        title: "确认要取消授权吗？",
        onOk: () => {
          this.$store
            .dispatch("system/cancelRule", {
              permissionCode: record.code,
              roleCode: this.code
            })
            .then(res => {
              this.$message.success("取消授权成功");
              this.getAuthRuleList();
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
      .actions-box {
        display: flex;
        .item {
          margin: 0 8px 0 0;
          padding: 0 7px;
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
          background: #fafafa;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
}
.actions-item {
  background: #f8f9fb;
  border-radius: 4px;
  padding: 26px 0 10px;
  position: relative;
  margin-bottom: 10px;
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
