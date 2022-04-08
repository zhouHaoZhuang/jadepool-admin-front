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
        <a-form-model-item ref="name" label="地域CODE" prop="regionCode">
          <a-input
            v-model="form.regionCode"
            placeholder="请输入地域CODE"
          ></a-input>
        </a-form-model-item>
        <a-form-item label="地域名称" prop="regionName">
          <a-input
            v-model="form.regionName"
            placeholder="请输入地域名称"
          ></a-input>
        </a-form-item>
        <a-form-model-item label="供应商">
          <a-select
            style="width:150px"
            v-model="form.supplierName"
            allowClear
            placeholder="请选择供应商"
            @change="getSupplier"
          >
            <a-select-option
              v-for="item in supplierList"
              :key="item.supplierCode"
              :value="item.supplierCode"
            >
              {{ item.supplierName }}
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
          this.form = newVal;
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
      supplierList: [], //供应商列表
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
  activated() {
    this.getList();
  },
  methods: {
    //获取供应商列表
    getList() {
      this.$store.dispatch("provider/getList", this.listQuery).then(res => {
        this.supplierList = res.data.list;
      });
    },
    getSupplier(val){
   console.log(val,'aaa');
   
   this.supplierList.forEach(ele => {
     if(val === ele.supplierCode){
       this.form.supplierName = ele.supplierName
       this.form.supplierCode = ele.supplierCode
     }
   });
    },
    //新增，编辑地域
    handleOk() {
      this.confirmLoading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let title;
          let tig;
          // let obj = {};
          // obj.id = this.form.id;
          // obj.
          if (this.title === 1) {
            title = "确认新增地域吗?";
            tig = "地域新增成功";
            this.addOption(title, tig, this.form);
          } else {
            title = "确认更新地域吗?";
            tig = "地域更新成功";
            this.editOption(title, tig, this.form);
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
            .dispatch("territory/add", obj)
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
            .dispatch("territory/edit", obj)
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
