<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    :title="modalTitle"
    wrapClassName="update-role-container"
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
      <a-form-model-item label="角色Code" prop="code">
        <a-input
          v-model="form.code"
          v-role-input
          :max-length="30"
          placeholder="请输入角色Code，填写一个名词，例如：admin"
        />
      </a-form-model-item>
      <a-form-model-item label="角色描述">
        <a-input
          v-model="form.description"
          :max-length="50"
          placeholder="请输入角色描述"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { systemAdminMapEnum } from "@/utils/enum";
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    },
    // 单个权限详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    modalTitle() {
      return this.type === "add" ? "添加角色" : "修改角色";
    }
  },
  watch: {
    detail: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== "{}") {
          this.type = "edit";
          this.form = { ...this.detail };
        } else {
          this.type = "add";
        }
      },
      immediate: true
    },
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  data() {
    return {
      systemAdminMapEnum,
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      loading: false,
      form: {
        code: "",
        description: ""
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入角色Code",
            tigger: ["blur", "change"]
          }
        ]
      },
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "角色Code",
          dataIndex: "code"
        },
        {
          title: "角色描述",
          dataIndex: "description"
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          scopedSlots: { customRender: "createdAt" }
        },
        {
          title: "操作",
          dataIndex: "action",
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
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        code: "",
        description: ""
      };
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req =
            this.type === "add" ? "system/addRole" : "system/editRole";
          const data =
            this.type === "add"
              ? { ...this.form }
              : {
                  ...this.form,
                  code: this.detail.code,
                  newCode: this.form.code
                };
          this.$store
            .dispatch(req, data)
            .then(res => {
              this.$message.success(this.modalTitle + "成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 查询已授权用户列表
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("system/getRoleList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  }
};
</script>
