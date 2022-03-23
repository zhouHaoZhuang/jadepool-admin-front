<template>
  <div class="addproduct">
    <div class="box-wrap">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          v-if="type === 'add'"
          ref="productName"
          label="产品名称"
          prop="productName"
        >
          <a-input v-model="form.productName" />
        </a-form-model-item>
        <a-form-model-item v-else label="产品ID">
          {{ form.id }}
        </a-form-model-item>
        <a-form-model-item label="供应商" prop="supplierCode">
          <a-select
            label-in-value
            v-model="form.supplierCode"
            @change="onChange"
          >
            <a-select-option
              v-for="v in supplierNameList"
              :value="v.supplierCode"
              :key="v.id"
            >
              {{ v.supplierName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          ref="supplierProductCode"
          label="供应商产品CODE"
          prop="supplierProductCode"
        >
          <a-select
            v-model="form.supplierProductCode"
            @change="handleProductChange"
          >
            <a-select-option
              v-for="item in productList"
              :value="item.supplierProductCode"
              :key="item.supplierProductCode"
            >
              {{ item.supplierProductCode }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 产品分类列表 -->
        <div
          class="product-list"
          v-for="item in form.productType.productTypes"
          :key="item.id"
        >
          <a-form-model-item
            class="model-item"
            :wrapper-col="{ span: 18, offset: 6 }"
          >
            <div class="item">
              <div class="label">分类名称：</div>
              <div class="value">
                {{ item.productTypeName }}
              </div>
            </div>
          </a-form-model-item>
          <a-form-model-item
            class="model-item"
            :wrapper-col="{ span: 18, offset: 6 }"
          >
            <div class="item">
              <div class="label">最小计费单位：</div>
              <div class="value">
                {{ item.chargeUnit }}
              </div>
            </div>
          </a-form-model-item>
        </div>
        <a-form-model-item
          v-if="
            form.supplierProductCode &&
              form.productType.productTypes.length === 0
          "
          class="model-item"
          :wrapper-col="{ span: 18, offset: 6 }"
        >
          <a-empty description="暂无产品分类" />
        </a-form-model-item>
        <a-form-model-item label="默认采购账号" prop="defaultPurchaseAccount">
          <a-select v-model="form.defaultPurchaseAccount">
            <a-select-option
              v-for="item in purchase"
              :value="item.accountCode"
              :key="item.accountCode"
            >
              {{ item.accountTag }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="备注" ref="remark">
          <a-textarea v-model="form.remark" :row="4" />
        </a-form-model-item>
        <a-button type="primary" @click="onSubmit" :loading="loading">
          提交
        </a-button>
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
      other: "",
      form: {
        productName: "", //产品名称
        supplierCode: "", //供应商CODE
        supplierName: "", //供应商
        supplierProductCode: "", //供应商产品CODE
        remark: "", //备注
        productType: {
          productTypes: []
        },
        defaultPurchaseAccount: ""
      },
      rules: {
        productName: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: ["blur", "change"]
          }
        ],
        supplierCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: ["blur", "change"]
          }
        ],
        supplierProductCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: ["blur", "change"]
          }
        ],
        defaultPurchaseAccount: [
          {
            required: true,
            message: "请选择默认采购账号",
            trigger: "change"
          }
        ]
      },
      loading: false,
      supplierNameList: [],
      purchase: [],
      productList: []
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/production/product/updateProduct") {
          this.resetForm();
          this.getProviderList();
          this.getProductList();
          this.getPurchaseList();
          if (newVal.query.id) {
            this.type = "edit";
            this.getDetail();
          } else {
            this.type = "add";
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取详情
    getDetail() {
      this.$store.dispatch("pool/getOne", this.$route.query.id).then(res => {
        this.form = { ...res.data };
        this.form.supplierCode = {
          key: res.data.supplierCode,
          label: res.data.supplierName
        };
      });
    },
    // 获取供应商产品列表
    getProductList() {
      this.$store.dispatch("pool/getProductList").then(res => {
        this.productList = [...res.data.supplierProducts];
      });
    },
    // 获取供应商列表
    getProviderList() {
      this.$store.dispatch("provider/getList").then(res => {
        this.supplierNameList = res.data.list;
      });
    },
    // 获取采购账号列表
    getPurchaseList() {
      this.$store.dispatch("purchase/getList").then(res => {
        this.purchase = res.data.list;
      });
    },
    // 提交
    onSubmit() {
      this.form.supplierCode = this.form.supplierCode.key;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req = this.type === "add" ? "pool/addList" : "pool/changeList";
          this.$store
            .dispatch(req, this.form)
            .then(val => {
              console.log(val);
              this.$message.success("提交成功");
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    onChange(val) {
      this.form.supplierName = val.label;
    },
    // 产品code切换
    handleProductChange(val) {
      const productObj = this.productList.find(
        ele => ele.supplierProductCode === val
      );
      this.form.productType.productTypes = [...productObj.productTypes];
    },
    // 重置表单数据
    resetForm() {
      this.form = {
        productName: "", //产品名称
        supplierCode: "", //供应商CODE
        supplierName: "", //供应商
        supplierProductCode: "", //供应商产品CODE
        remark: "", //备注
        productType: {
          productTypes: []
        },
        defaultPurchaseAccount: ""
      };
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    }
  }
};
</script>

<style scoped lang="less">
.addproduct {
  width: 1220px;
  background-color: #fff;
  margin: 0 24px;
  padding: 20px;
  min-height: 615px;
  > .box-wrap {
    width: 600px;
    margin: 0 auto;
    // text-align: center;
    background-color: #fff;
    button {
      position: relative;
      left: 150px;
    }
  }
  .info-txt {
    color: #aaa;
    line-height: 20px;
  }
  .product-list {
    .model-item {
      margin-bottom: 0;
    }
    .item {
      display: flex;
      position: relative;
      .label {
        width: 120px;
      }
      .value {
        flex: 1;
        padding-right: 30px;
      }
    }
  }
}
</style>
