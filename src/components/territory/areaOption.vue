<template>
  <div>
    <a-modal
      :title="newTitle"
      width="650px"
      :visible="visibleDetail"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="地域CODE" prop="code">
          <a-input v-model="form.code" placeholder="请输入地域CODE"></a-input>
        </a-form-model-item>
        <a-form-item label="地域名称" prop="accountName">
          <a-input
            v-model="form.accountName"
            placeholder="请输入地域名称"
          ></a-input>
        </a-form-item>
        <a-form-model-item label="供应商">
          <a-select
            style="width:150px"
            v-model="form.account"
            allowClear
            placeholder="请选择供应商"
          >
            <a-select-option
              :value="v.key"
              v-for="v in useColumns"
              :key="v.title"
            >
              {{ v.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <a-button @click="handleOk()" type="primary">确定</a-button>
        <a-button @click="handleCancel">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  model: {
    event: "changeVisible",
    prop: "visibleDetail"
  },
  props: {
    // 是否显示弹框
    visibleDetail: {},
    //1 采购-财务管理下的提现申请详情  2 销售-财务管理-提现管理-提现操作
    type: {},
    // 申请提现详情
    detailInfo: {
      type: Object,
      default: () => {}
    },
    //标题
    title: {}
  },
  watch: {
    visibleDetail: {
      handler(newVal) {},
      immediate: true
    },
    detailInfo: {
      handler(newVal) {
        this.$nextTick(() => {
          // this.form = newVal;
          this.form = {};
        });
      },
      immediate: true,
      deep: true
    },
    title: {
      handler(newVal) {
        if (newVal == 1) {
          this.newTitle = "新增地域";
        } else if (newVal == 2) {
          this.newTitle = "编辑地域";
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    useColumns() {
      return [
        {
          title: "订单编号",
          dataIndex: "code",
          key: "code",
          width: 170
        },
        {
          title: "渠道ID",
          dataIndex: "cutomerCode",
          key: "cutomerCode",
          width: 150
        }
      ];
    }
  },
  data() {
    return {
      confirmLoading: false,
      newTitle: "",
      form: {
        account: "1",
        accountName: "2"
      },
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      rules: {
        code: [
          {
            required: true,
            message: "未填写地域CODE",
            trigger: ["blur", "change"]
          }
        ],
        accountName: [
          {
            required: true,
            message: "未填写地域名称",
            trigger: ["blur", "change"]
          }
        ],
        account: [
          {
            required: true,
            message: "未选择供应商",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //新增，编辑地域
    handleOk() {
      this.confirmLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let title;
          let tig;
          let obj = {};
          obj.id = this.form.id;
          if (this.title === 1) {
            title = "确认新增地域吗?";
            tig = "地域新增成功";
            this.addOption(title, tig, obj);
          } else {
            title = "确认更新地域吗?";
            tig = "地域更新成功";
            this.editOption(title, tig, obj);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //新增
    addOption(title, tig, obj) {
      this.$confirm({
        title: title,
        onOk: () => {
          this.$store
            .dispatch("withdraw/approval", obj)
            .then(res => {
              this.$message.success(tig);
              this.$emit("changeVisible", false);
              this.$emit("success");
            })
            .catch(err => {
              this.confirmLoading = false;
            });
        }
      });
    },
    //编辑
    editOption(title, tig, obj) {
      this.$confirm({
        title: title,
        onOk: () => {
          this.$store
            .dispatch("withdraw/approval", obj)
            .then(res => {
              this.$message.success(tig);
              this.$emit("changeVisible", false);
              this.$emit("success");
            })
            .catch(err => {
              this.confirmLoading = false;
            });
        }
      });
    },

    // 取消弹框
    handleCancel(e) {
      this.$emit("changeVisible", false);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-form-item {
  display: flex;
}
</style>
