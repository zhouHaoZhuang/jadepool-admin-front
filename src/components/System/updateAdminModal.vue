<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    :title="modalTitle"
    wrapClassName="update-admin-container"
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
      <a-form-model-item label="权限名称" prop="code">
        <a-input
          v-model="form.code"
          :disabled="type === 'edit'"
          :maxLength="50"
          placeholder="请输入权限名称，填写一个名词，例如：order"
        />
      </a-form-model-item>
      <a-form-model-item label="菜单级别">
        <a-radio-group v-model="form.type">
          <a-radio
            v-for="(value, key) in systemAdminMapEnum"
            :key="key"
            :value="key"
          >
            {{ value }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-if="form.type === 'API'" label="API URL">
        <a-input v-model="form.description" placeholder="请输入API URL" />
      </a-form-model-item>
      <a-form-model-item label="权限描述">
        <a-input v-model="form.description" placeholder="请输入权限描述" />
      </a-form-model-item>
      <a-form-model-item label="操作类型" style="margin-bottom:0">
        <div class="btn-wrap">
          <a-button
            type="link"
            icon="plus"
            size="small"
            @click="handleAddAction"
          >
            添加Action（操作类型）
          </a-button>
        </div>
      </a-form-model-item>
      <div
        v-for="(item, index) in form.actions"
        :key="item.id"
        class="actions-item"
      >
        <a-form-model-item
          label="操作"
          :prop="'actions.' + index + '.name'"
          :rules="{
            required: true,
            message: '请输入操作名称',
            trigger: ['blur', 'change']
          }"
        >
          <a-input
            :addon-before="form.code + '：'"
            v-model="item.name"
            placeholder="动作，例如add"
          />
        </a-form-model-item>
        <a-form-model-item label="操作描述">
          <a-input
            v-model="item.description"
            placeholder="描述信息，例如：添加商品"
          />
        </a-form-model-item>
        <a-icon
          class="close"
          type="close-circle"
          @click="handleDelAction(index)"
        />
      </div>
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
      return this.type === "add" ? "添加权限" : "修改权限";
    }
  },
  watch: {
    detail: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== "{}") {
          this.type = "edit";
          const newActions = this.detail.actions.map((ele, index) => {
            return {
              id: -1 - index,
              ...ele
            };
          });
          this.form = { ...this.detail, actions: [...newActions] };
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
        type: "MENU",
        description: "",
        actions: []
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入权限名称",
            tigger: ["blur", "change"]
          }
        ]
      }
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
        type: "MENU",
        description: "",
        actions: []
      };
    },
    // 添加操作类型
    handleAddAction() {
      const data = {
        id: -1,
        name: "",
        description: ""
      };
      if (this.form.actions.length === 0) {
        this.form.actions.push({ ...data });
      } else {
        const id = this.form.actions[this.form.actions.length - 1].id - 1;
        this.form.actions.push({ ...data, id });
      }
    },
    // 删除操作类型
    handleDelAction(index) {
      this.form.actions.splice(index, 1);
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.form);
          this.loading = true;
          const req =
            this.type === "add" ? "system/addAdmin" : "system/editAdmin";
          this.$store
            .dispatch(req, this.form)
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
    }
  }
};
</script>
<style lang="less" scoped>
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
