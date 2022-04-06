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
          <a-select
            label-in-value
            v-model="form.productName"
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
        <a-form-model-item v-else label="产品ID">
          {{ form.id }}
        </a-form-model-item>
        <a-form-model-item label="产品分类" prop="supplierCode">
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
          label="地域选择"
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
        <a-form-model-item prop="supplierProductType" label="计费单位">
          <span>{{ form.supplierProductType }}</span>
        </a-form-model-item>
        <a-form-model-item ref="price" label="标准单价" prop="price">
          <a-input v-model="form.productName" />
          <span class="ant-form-text">
            元
          </span>
        </a-form-model-item>
        <a-form-model-item label="是否阶梯计价">
          <a-radio-group v-decorator="['radio-group']">
            <a-radio value="a">
              是
            </a-radio>
            <a-radio value="b">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <div>
          <hr />
          <!-- 阶梯计价信息 -->
          <div>
            <h3>阶梯计价信息</h3>
            <div>
              <a-table
                :pagination="false"
                :data-source="dataSource"
                :columns="columns"
              >
                <div slot="name" slot-scope="text, record">
                  <a-input-group compact>
                    <a-input style=" width: 80px; text-align: center" />
                    <a-input
                      style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                      placeholder="~"
                      disabled
                    />
                    <a-input
                      style="width: 80px; text-align: center; border-left: 0"
                    />
                  </a-input-group>
                </div>
                <div slot="age" slot-scope="text, record">
                  <a-input style="width:80px"></a-input>
                </div>
                <template slot="operation" slot-scope="text, record">
                  <a-popconfirm
                    v-if="dataSource.length"
                    title="确认删除吗?"
                    @confirm="() => onDelete(record.key)"
                  >
                    <a href="javascript:;">删除</a>
                  </a-popconfirm>
                </template>
              </a-table>
              <div class="editable-add-btn" @click="handleAdd">
                +添加行
              </div>
            </div>
          </div>
        </div>
        <a-button
          type="primary"
          @click="onSubmit"
          :loading="loading"
          style="margin-top:30px;"
        >
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
        supplierProductType: "", //供应商产品类型
        productType: {
          productTypes: []
        },
        defaultPurchaseAccount: ""
      },
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32"
        }
      ],
      count: 2,
      columns: [
        {
          title: "计量阶梯",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "固定价格(元)",
          dataIndex: "age",
          scopedSlots: { customRender: "age" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
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
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
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
      this.form.supplierProductType = productObj.supplierProductType;
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
  .editable-add-btn {
    width: 100%;
    height: 35px;
    border: 1px dashed #ccc;
    text-align: center;
    align-items: center;
    line-height: 33px;
    margin-top: 20px;
  }
}
</style>
