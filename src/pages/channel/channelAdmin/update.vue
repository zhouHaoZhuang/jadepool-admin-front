<template>
  <div class="channel-list-add">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          v-if="type === 'add'"
          label="渠道商名称"
          prop="channelCustomerCode"
        >
          <a-select
            style="width:100%"
            allowClear
            v-model="form.channelCustomerCode"
            placeholder="渠道商名称"
          >
            <a-select-option
              v-for="item in data"
              :key="item.id"
              :value="item.id"
            >
              {{ item.cutomerName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'add'"
          label="资源池产品"
          prop="productCode"
        >
          <a-select
            style="width:100%"
            allowClear
            v-model="form.productCode"
            placeholder="资源池产品"
          >
            <a-select-option
              v-for="item in priceData"
              :key="item.productCode"
              :value="item.id"
            >
              {{ item.productName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="渠道商名称">
          {{ form.channelCustomerCode }}
        </a-form-model-item>
        <a-form-model-item v-if="type === 'edit'" label="资源池产品">
          {{ form.productCode }}
        </a-form-model-item>
        <a-form-model-item label="折扣方式" prop="discountType">
          <a-radio-group v-model="form.discountType">
            <a-radio value="0">
              固定价格
            </a-radio>
            <a-radio value="1">
              比例折扣
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          v-if="form.discountType === '1'"
          label="折扣比例"
          prop="discountPrice"
        >
          <a-input
            v-model="form.discountPrice"
            addon-after="%"
            v-number-evolution="{ value: 2, min: 0, max: 100 }"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        channelCustomerCode: undefined,
        channelCustomerName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: undefined
      },
      rules: {
        channelCustomerCode: [
          {
            required: true,
            message: "请选择渠道商名称",
            trigger: "change"
          }
        ],
        productCode: [
          {
            required: true,
            message: "请选择资源池产品",
            trigger: "blur"
          }
        ],
        discountType: [
          {
            required: true,
            message: "请选择折扣方式",
            trigger: "change"
          }
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入折扣比例",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: [],
      priceData: []
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/channel/index/update") {
          this.$nextTick(() => {
            this.resetForm();
          });
          if (newVal.query.id) {
            this.type = "edit";
            this.getDetail();
          } else {
            this.type = "add";
            this.getList();
            this.getPriceList();
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 查询渠道商列表数据
    getList() {
      this.$store
        .dispatch("channel/getList", { currentPage: 1, pageSize: 999 })
        .then(res => {
          this.data = [...res.data.list];
        });
    },
    // 查询表格数据
    getPriceList() {
      this.$store
        .dispatch("channel/getPriceList", { currentPage: 1, pageSize: 999 })
        .then(res => {
          this.priceData = [...res.data.list];
        });
    },
    // 获取详情
    getDetail() {
      this.$store
        .dispatch("channel/getPriceDetail", { id: this.$route.query.id })
        .then(res => {
          this.form = { ...res.data };
        });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let newFrom = {};
          if (this.type === "add") {
            newFrom = {
              ...this.form,
              channelCustomerName: this.$getArrOnceData(
                this.form.channelCustomerCode,
                this.data
              ).cutomerName,
              productName: this.$getArrOnceData(
                this.form.productCode,
                this.priceData
              ).productName
            };
          } else {
            newFrom = { ...this.form };
          }
          this.$store
            .dispatch(
              this.type === "add" ? "channel/addPrice" : "channel/editPrice",
              newFrom
            )
            .then(res => {
              this.$message.success(
                this.type === "add"
                  ? "新增产品采购价成功"
                  : "编辑产品采购价成功"
              );
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        channelCustomerCode: undefined,
        channelCustomerName: "",
        productCode: undefined,
        productName: "",
        discountType: "1",
        discountPrice: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
