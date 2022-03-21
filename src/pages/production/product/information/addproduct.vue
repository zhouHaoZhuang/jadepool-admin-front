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
          ref="productName"
          label="资源池产品名称"
          prop="productName"
        >
          <a-input v-model="form.productName" />
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
        <a-form-model-item ref="supplierProductCode" label="供应商产品CODE">
          <a-input v-model="form.supplierProductCode" />
          <div class="info-txt">
            输入规范：产品简称_厂商简称，例CND_ALI
          </div>
        </a-form-model-item>
        <a-form-model-item
          ref="supplierProductType"
          label="产品分类"
          prop="type"
        >
          <a-radio-group v-model="form.type">
            <a-radio :value="1">
              无
            </a-radio>
            <a-radio :value="2">
              有
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <!-- 产品分类列表 -->
        <div v-if="form.type === 2">
          <div
            class="product-list"
            v-for="(item, index) in form.typeList"
            :key="item.id"
          >
            <a-form-model-item
              :wrapper-col="{ span: 18, offset: 6 }"
              :prop="'typeList.' + index + '.name'"
              :rules="{
                required: true,
                message: '请输入分类名称',
                trigger: ['blur', 'change']
              }"
            >
              <div class="item">
                <div class="label">分类名称：</div>
                <div class="value">
                  <a-input v-model="item.name" :maxLength="20" />
                </div>
                <a-icon
                  v-if="index === 0"
                  class="add"
                  type="plus-square"
                  @click="handleAdd"
                />
                <a-icon
                  v-else
                  class="del"
                  type="minus-square"
                  @click="handleDel(index)"
                />
              </div>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
              <div class="item">
                <div class="label">最小计费单位：</div>
                <div class="value">
                  <a-select v-model="item.unit">
                    <a-select-option :value="1">
                      万次
                    </a-select-option>
                    <a-select-option :value="2">
                      GB
                    </a-select-option>
                  </a-select>
                </div>
              </div>
            </a-form-model-item>
          </div>
        </div>
        <a-form-model-item label="备注" ref="remark">
          <a-input v-model="form.remark" type="textarea" />
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: "",
      form: {
        productName: "", //产品名称
        productCode: "", //产品CODE
        supplierCode: "", //供应商CODE
        supplierName: "", //供应商
        supplierProductCode: "", //供应商产品CODE
        supplierProductType: "", //供应商产品Type
        remark: "", //备注
        type: 1,
        typeList: [
          {
            id: -1,
            name: "",
            unit: 1
          }
        ]
      },
      rules: {
        productName: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        productCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "blur"
          }
        ],
        supplierCode: [
          {
            required: true,
            message: "输入值不能为空",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择产品分类",
            trigger: "change"
          }
        ]
      },
      loading: false,
      supplierNameList: [],
      purchase: []
    };
  },
  activated() {
    // 此处需要获取供应商列表
    this.$store.dispatch("provider/getList").then(res => {
      this.supplierNameList = res.data.list;
    });
    // 此处需要获取默认采购账号列表
    this.$store.dispatch("purchase/getList").then(val => {
      // console.log(val.data.list);
      this.purchase = val.data.list;
    });
  },
  methods: {
    // 添加产品分类
    handleAdd() {
      const id = this.form.typeList[this.form.typeList.length - 1].id - 1;
      const data = {
        id,
        name: "",
        unit: 1
      };
      this.form.typeList.push({ ...data });
    },
    // 删除产品分类
    handleDel(index) {
      this.form.typeList.splice(index, 1);
    },
    // 提交
    onSubmit() {
      // this.form.supplierCode = this.form.supplierCode.key;
      // console.log(this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("pool/addList", this.form).then(val => {
            console.log(val);
            this.$message.success("提交成功");
            this.$router.back();
            this.resetForm();
          });
        }
      });
    },
    onChange(val) {
      this.form.supplierName = val.label;
      // console.log(val);
      // this.form.supplierCode = val.key;
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        productName: "",
        productCode: "",
        supplierName: "",
        supplierProductCode: "",
        supplierProductType: "",
        pm: "",
        remark: ""
      };
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
  .info-txt{
    color: #aaa;
    line-height: 20px;
  }
  .product-list {
    .item {
      display: flex;
      position: relative;
      .label {
        width: 120px;
        &::before {
          display: inline-block;
          margin-right: 4px;
          color: #f5222d;
          font-size: 14px;
          font-family: SimSun, sans-serif;
          line-height: 1;
          content: "*";
        }
      }
      .value {
        flex: 1;
        padding-right: 30px;
      }
      .add,
      .del {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #aaa;
        cursor: pointer;
      }
    }
  }
}
</style>
