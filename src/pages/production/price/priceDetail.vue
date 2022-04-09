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
          label="产品名称"
          prop="productName"
        >
          <a-select
            style="width:100%"
            allowClear
            v-model="form.productName"
            @change="handleProductChange"
          >
            <a-select-option
              v-for="item in priceData"
              :key="item.productName"
              :value="item.productName"
            >
              {{ item.productName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'add'"
          label="产品分类"
          prop="productTypeName"
        >
          <a-select v-model="form.productTypeName" @change="handleTypeChange">
            <a-select-option
              v-for="item in productList"
              :value="item.productTypeCode"
              :key="item.productTypeCode"
            >
              {{ item.productTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'add'"
          ref="regionName"
          label="地域选择"
          prop="regionName"
        >
          <a-select v-model="form.regionName" @change="handleRegionChange">
            <a-select-option
              v-for="item in areaList"
              :value="item.regionName"
              :key="item.regionName"
            >
              {{ item.regionName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'edit' || type === 'detail'"
          label="产品名称"
        >
          {{ form.productName }}
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'edit' || type === 'detail'"
          label="产品分类"
        >
          {{ form.productTypeName }}
        </a-form-model-item>
        <a-form-model-item
          v-if="type === 'edit' || type === 'detail'"
          label="地域选择"
        >
          {{ form.regionName }}
        </a-form-model-item>

        <a-form-model-item prop="chargeUnit" label="计费单位">
          <span>{{ form.chargeUnit }}</span>
        </a-form-model-item>
        <a-form-model-item label="是否阶梯计价">
          <!--  -->
          <a-radio-group
            v-decorator="['radio-group']"
            v-model="form.enableLadderPrice"
          >
            <a-radio :value="true">
              是
            </a-radio>
            <a-radio :value="false">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          ref="price"
          label="标准单价"
          prop="standardPrice"
          v-if="!form.enableLadderPrice && type !== 'detail'"
        >
          <a-input
            v-model="form.standardPrice"
            v-number-evolution="{ value: 2, min: 0.01, max: 9999999 }"
            style="width:260px;"
          />
          <span class="ant-form-text">
            元
          </span>
        </a-form-model-item>
        <a-form-model-item
          ref="price"
          label="标准单价"
          prop="standardPrice"
          v-if="!form.enableLadderPrice && type === 'detail'"
        >
          {{ form.standardPrice }}
          <span class="ant-form-text">
            元
          </span>
        </a-form-model-item>

        <div v-if="form.enableLadderPrice">
          <hr />
          <!-- 阶梯计价信息 -->
          <div>
            <h3>阶梯计价信息</h3>
            <div>
              <a-table
                :pagination="false"
                :data-source="form.ladderPriceInfo.ladderPriceList"
                :columns="columns"
              >
                <div slot="name" slot-scope="text, record">
                  <a-input-group compact v-if="type !== 'detail'">
                    <a-input
                      style=" width: 80px; text-align: center"
                      v-model="record.startData"
                      v-number-evolution="{ value: 2, min: 0, max: 9999999 }"
                      disabled
                    />
                    <a-input
                      style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
                      placeholder="~"
                      disabled
                    />
                    <a-input
                      style="width: 90px; text-align: center; border-left: 0"
                      v-model="record.endData"
                      v-number-evolution="{ value: 2, min: 0, max: 9999999 }"
                      @keyup="changeEnd(record)"
                    />
                  </a-input-group>
                  <div v-else>
                    {{ record.startData }} ~ {{ record.endData }}
                  </div>
                </div>
                <div slot="price" slot-scope="text, record">
                  <div v-if="type === 'detail'">
                    {{ record.price }}
                  </div>
                  <div v-else>
                    <a-input
                      style="width:80px"
                      v-model="record.price"
                      v-number-evolution="{ value: 2, min: 0.01, max: 9999999 }"
                    ></a-input>
                  </div>
                </div>
                <template slot="operation" slot-scope="text, record">
                  <!-- <span
                  
                    @click="onDelete(record.key)"
                    >删除</span
                  > -->
                  <!-- :disabled="form.ladderPriceInfo.ladderPriceList.length>2 &&" -->
                  <div v-if="type !== 'detail'">
                    <a-button
                      style="border:none;background:none;"
                      :disabled="canDel(record)"
                      @click="onDelete()"
                      >删除</a-button
                    >
                  </div>
                </template>
              </a-table>
              <div class="editable-add-btn" @click="handleAdd()">
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
          v-if="type !== 'detail'"
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
        chargeUnit: "",
        enableLadderPrice: false,
        ladderPriceInfo: {
          ladderPriceList: [
            {
              endData: undefined,
              price: undefined,
              startData: undefined
            },
            {
              endData: undefined,
              price: undefined,
              startData: 0
            }
          ]
        },
        productCode: "",
        productName: "",
        productTypeCode: "",
        productTypeName: "",
        regionCode: "",
        regionName: "",
        standardPrice: undefined
      },
      count: 2,
      columns: [
        {
          title: "计量阶梯",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "固定价格(元)",
          dataIndex: "price",
          scopedSlots: { customRender: "price" }
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
            message: "产品名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        productTypeName: [
          {
            required: true,
            message: "产品分类不能为空",
            trigger: ["blur", "change"]
          }
        ],
        regionName: [
          {
            required: true,
            message: "地域选择不能为空",
            trigger: ["blur", "change"]
          }
        ],
        standardPrice: [
          {
            required: true,
            message: "标准单价不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      supplierNameList: [],
      purchase: [],
      productList: [],
      inputUnit: "",
      priceData: [], //产品名称数据
      areaList: [], //地域列表
      canAdd: true // 是否可以点击添加行
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/production/price/addPrice") {
          this.type = "add";
          this.resetForm();
          this.getProductList();
          //获取地域列表
          this.getAreaList();
          //获取产品名称数据
          this.getPriceList();
        } else if (newVal.path === "/production/price/priceDetail") {
          this.type = "detail";
          this.getDetail();
        } else if (newVal.path === "/production/price/updatePrice") {
          this.type = "edit";
          this.getDetail();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 删除行
    onDelete() {
      if (this.form.ladderPriceInfo.ladderPriceList.length > 2) {
        this.form.ladderPriceInfo.ladderPriceList.shift();
        this.form.ladderPriceInfo.ladderPriceList[0].endData = undefined;
      }
    },
    // 产品分类切换
    handleTypeChange(val) {
      const newObj = this.productList.find(ele => ele.productTypeCode === val);
      this.form.chargeUnit = newObj.chargeUnit;
      this.form.productTypeName = newObj.productTypeName;
    },
    //添加行
    handleAdd() {
      console.log(this.canAdd,'canAdd');
      if(this.canAdd){
         let newList = this.form.ladderPriceInfo.ladderPriceList;
        let startData = newList[0].endData;
        if (startData) {
          const newData = {
            endData: undefined,
            price: undefined,
            startData: startData
          };
          this.form.ladderPriceInfo.ladderPriceList.unshift(newData);
        } else {
          this.$message.warn("请输入上方阶梯值的结尾值");
          return false;
        } 
      }
         if(!this.canAdd){
           this.$message.warn("请校验上方阶梯值的结尾值");
           return false;
         }
    },
    // 修改第二个值
    changeEnd(val) {
      if (val.endData <= val.startData) {
        this.$message.error("当前值必须大于起始值");
        // val.endData = ''
        this.canAdd = false;
        return false;
      }else{
        this.canAdd = true;
      }
    },
    // 是否可以删除
    canDel(record) {
      if (this.form.ladderPriceInfo.ladderPriceList.length <= 2) {
        return true;
      } else if (record !== this.form.ladderPriceInfo.ladderPriceList[0]) {
        return true;
      } else {
        return false;
      }
    },

    //获取地域列表
    getAreaList() {
      this.$store.dispatch("territory/getList").then(res => {
        this.areaList = [...res.data.list];
      });
    },
    // 选择地域
    handleRegionChange(val) {
      this.areaList.forEach(element => {
        if (val === element.regionName) {
          this.form.regionCode = element.regionCode;
        }
      });
    },
    // 资源池产品切换
    handleProductChange(val) {
      const productObj = this.priceData.find(ele => ele.productName === val);
      const flag =
        Object.keys(productObj).includes("productType") &&
        productObj.productType.productTypes.length > 0;
      this.productList = flag ? [...productObj.productType.productTypes] : [];
      if (!flag) {
        this.form.productTypeCode = undefined;
      } else {
        this.form.productTypeCode = this.productList[0].productTypeCode;
        this.form.chargeUnit = this.productList[0].chargeUnit;
        this.form.productCode = productObj.productCode;
      }
    },
    // 获取详情
    getDetail() {
      this.$store.dispatch("price/getOne", this.$route.query.id).then(res => {
        this.form = { ...res.data };
      });
    },
    // 获取产品列表
    getProductList() {
      this.$store.dispatch("pool/getProductList").then(res => {
        this.productList = [...res.data.supplierProducts];
      });
    },
    // 查询产品名称数据
    getPriceList() {
      this.$store
        .dispatch("pool/getList", { currentPage: 1, pageSize: 999 })
        .then(res => {
          this.priceData = [...res.data.list];
        });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req =
            this.type === "add" ? "price/addList" : "price/changeList";
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

    // 重置表单数据
    resetForm() {
      this.form = {
        chargeUnit: "",
        enableLadderPrice: false,
        ladderPriceInfo: {
          ladderPriceList: [
            {
              endData: undefined,
              price: undefined,
              startData: undefined
            },
            {
              endData: undefined,
              price: undefined,
              startData: 0
            }
          ]
        },
        productCode: "",
        productName: "",
        productTypeCode: "",
        productTypeName: "",
        regionCode: "",
        regionName: "",
        standardPrice: undefined
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
    // button {
    //   position: relative;
    //   left: 150px;
    // }
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
