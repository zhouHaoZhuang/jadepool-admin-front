<template>
  <div class="member-discount-update">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分配方式选择" prop="distributeWay">
          <a-select
            style="width: 100%"
            allowClear
            v-model="form.distributeWay"
            @change="distributeWays"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in distributeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 指定客户 -->
        <a-form-model-item
          label="选择客服"
          prop="advocateList"
          v-if="form.distributeWay === 1"
        >
          <a-select
            style="width: 100%"
            allowClear
            v-model="form.advocateList"
            placeholder="请选择客服"
          >
            <a-select-option
              :value="item.id"
              v-for="(item, index) in SelectCustomerList"
              :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label="选择客户"
          prop="userCodeList"
          v-if="form.distributeWay === 1"
        >
          <a-space :size="40">
            <a-select
              class="input-one"
              v-model="form.userCodeList"
              mode="multiple"
              :open="false"
            >
              <a-select-option
                :value="item.cutomerCode"
                v-for="(item, index) in userCodeList"
                :key="index"
              >
                {{ item.cutomerName }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="selectClient(1)"
              >选择客户</a-button
            >
          </a-space>
        </a-form-model-item>
        <!-- 指定替换 -->
        <a-form-model-item
          label="选择原客服"
          prop="advocateList"
          v-if="form.distributeWay === 2"
        >
          <a-space :size="40">
            <a-select
              class="input-one"
              v-model="form.advocateList"
              mode="multiple"
              :open="false"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in advocateList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="selectClient(2)"
              >选择原客服</a-button
            >
          </a-space>
        </a-form-model-item>
        <a-form-model-item
          label="选择新客服"
          prop="newAdvocateList"
          v-if="form.distributeWay === 2"
        >
          <a-select
            style="width: 100%"
            allowClear
            v-model="form.newAdvocateList"
            placeholder="请选择"
            :disabled="disabled"
          >
            <a-select-option
              :value="item.id"
              v-for="(item, index) in newAdvocateList"
              :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 随机替换 -->
        <a-form-model-item
          label="选择原客服"
          prop="advocateList"
          v-if="form.distributeWay === 3"
        >
          <a-space :size="40">
            <a-select
              class="input-one"
              v-model="form.advocateList"
              mode="multiple"
              :open="false"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in advocateList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="selectClient(3, 'yuan')"
              >选择原客服</a-button
            >
          </a-space>
        </a-form-model-item>
        <a-form-model-item
          label="选择新客服"
          prop="newAdvocateList"
          v-if="form.distributeWay === 3"
        >
          <a-space :size="40">
            <a-select
              class="input-one"
              v-model="form.newAdvocateList"
              mode="multiple"
              :open="false"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in newAdvocateList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="selectClient(3, 'new')"
              >选择新客服</a-button
            >
          </a-space>
        </a-form-model-item>
        <!-- 平均分配 -->
        <a-form-model-item
          label="选择客服"
          prop="advocateList"
          v-if="form.distributeWay === 4"
        >
          <a-space :size="40">
            <a-select
              class="input-one"
              v-model="form.advocateList"
              mode="multiple"
              :open="false"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in advocateList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="selectClient(4)"
              >选择客服</a-button
            >
          </a-space>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 11 }">
          <a-space :size="80">
            <a-button type="primary" @click="onSubmit" :loading="loading">
              确认
            </a-button>
            <a-button @click="back"> 取消 </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
      <div class="content-two">
        <p class="title">客户列表（以下客户对应客服发生变更）</p>
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="action" slot-scope="text" class="action">
            <a-button
              v-permission="'view'"
              type="link"
              class=""
              @click="selectInfo(text.id)"
            >
              查看
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <SelectClient
      v-show="SelectClientVisible"
      v-model="SelectClientVisible"
      :advocateList="advocateList"
      @selectData="getEmitData"
    />
    <SelectCustomer
      v-show="SelectCustomerVisibleOne"
      v-model="SelectCustomerVisibleOne"
      @filtercustomer="getfilterCustomer"
    />
    <SelectCustomerTwo
      v-show="SelectCustomerVisibleTwo"
      v-model="SelectCustomerVisibleTwo"
      @filtercustomer="getfilterCustomerTwo"
    />
    <NewSelectCustomer
      v-show="SelectCustomerVisibleNew"
      v-model="SelectCustomerVisibleNew"
      :newAdvocateList="newAdvocateList"
      @filterNewCustomer="getFilterNewCustomer"
    />
    <AverageCustomer
      v-show="SelectCustomerVisibleAverage"
      v-model="SelectCustomerVisibleAverage"
      @averageCustomer="fourCustomer"
    />
  </div>
</template>

<script>
//选择客服
import SelectCustomer from "@/components/cunstomerManage/customer.vue";
import SelectCustomerTwo from "@/components/cunstomerManage/customerTwo.vue";

//选择新客服
import NewSelectCustomer from "@/components/cunstomerManage/newCustomer.vue";
//第四个选择客服平均分配
import AverageCustomer from "@/components/cunstomerManage/AverageCustomer.vue";
// 选择客户
import SelectClient from "@/components/cunstomerManage/client.vue";
export default {
  components: {
    SelectClient,
    SelectCustomer,
    NewSelectCustomer,
    AverageCustomer,
    SelectCustomerTwo,
  },
  data() {
    return {
      type: "add",
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      disabled: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      SelectClientVisible: false,
      SelectCustomerVisibleOne: false,
      SelectCustomerVisibleTwo: false,
      SelectCustomerVisibleNew: false,
      SelectCustomerVisibleAverage: false,
      distributeList: [
        {
          label: "指定客户",
          value: 1,
        },
        {
          label: "指定替换",
          value: 2,
        },
        {
          label: "随机替换",
          value: 3,
        },
        {
          label: "平均分配",
          value: 4,
        },
      ],
      //选择的客服id
      advocateList: [],
      //筛选出的新客服
      newAdvocateList: [],
      //选择的客户id
      userCodeList: [],
      SelectCustomerList: [],
      form: {
        advocateList: undefined,
        userCodeList: undefined,
        distributeWay: undefined,
        newAdvocateList: undefined,
      },
      columns: [
        {
          title: "渠道商编码",
          dataIndex: "channelCode",
        },
        {
          title: "姓名",
          dataIndex: "channelName",
        },
        {
          title: "企业",
          dataIndex: "companyName",
        },
        {
          title: "手机",
          dataIndex: "number",
        },
        {
          title: "客服姓名",
          dataIndex: "name",
        },
        {
          title: "联系方式",
          dataIndex: "phone",
        },
      ],
      rules: {
        distributeWay: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        advocateList: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        newAdvocateList: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        userCodeList: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
      loading: false,
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
    };
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.path === "/channel/index/distribute") {
          this.$nextTick(() => {
            this.resetForm();
          });
          this.getCustomerList();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getList() {
      console.log("请求数据");
    },
    fourCustomer(data, id) {
      this.SelectCustomerVisibleAverage = false;
      this.advocateList = data;
      this.form.advocateList = id;
      this.$refs["ruleForm"].clearValidate(["advocateList"]);
    },
    getEmitData(data, id) {
      this.SelectClientVisible = false;
      this.userCodeList = data;
      this.form.userCodeList = id;
      console.log(data, id);
      this.$refs["ruleForm"].clearValidate(["userCodeList"]);
    },
    getFilterNewCustomer(data, id) {
      this.SelectCustomerVisibleNew = false;
      this.newAdvocateList = data;
      this.form.newAdvocateList = id;
      this.$refs["ruleForm"].clearValidate(["newAdvocateList"]);
    },
    getfilterCustomer(data, id) {
      this.SelectCustomerVisibleOne = false;
      this.advocateList = data;
      this.form.advocateList = id;
      this.$refs["ruleForm"].clearValidate(["advocateList"]);

      //筛选
      this.filterInterface();
    },
    getfilterCustomerTwo(data, id) {
      this.SelectCustomerVisibleTwo = false;
      this.advocateList = data;
      this.form.advocateList = id;
      this.$refs["ruleForm"].clearValidate(["advocateList"]);

      //筛选
      this.filterInterfaceTwo();
    },
    filterInterface() {
      let newData = {};
      newData.advocateList = this.form.advocateList;
      this.$store
        .dispatch("customer/getFilterCustomer", newData)
        .then((res) => {
          this.newAdvocateList = res.data.list;
          this.disabled = false;
        });
    },
    filterInterfaceTwo() {
      let newData = {};
      newData.advocateList = this.form.advocateList;
      this.$store
        .dispatch("customer/getFilterCustomer", newData)
        .then((res) => {
          this.newAdvocateList = res.data.list;
        });
    },
    selectClient(key, type) {
      //指定客户 指定替换 随机替换 平均分配
      if (this.form.distributeWay === 1) {
        //选择客户
        if (this.form.advocateList === undefined) {
          this.$message.warning("请先选择客服");
        } else {
          this.advocateList = this.form.advocateList;
          this.SelectClientVisible = true;
        }
      } else if (this.form.distributeWay === 2) {
        // 选择原客服
        this.SelectCustomerVisibleOne = true;
      } else if (this.form.distributeWay === 3) {
        if (type === "yuan") {
          this.SelectCustomerVisibleTwo = true;
        } else if (type === "new") {
          // 先选完原客服才能选新客服
          if (this.form.advocateList === undefined) {
            this.$message.warning("请先选择原客服");
          } else {
            this.SelectCustomerVisibleNew = true;
          }
        }
      } else if (this.form.distributeWay === 4) {
        this.SelectCustomerVisibleAverage = true;
      }
    },
    distributeWays() {
      //重新赋值客服
      this.form.advocateList = undefined;
      this.advocateList = undefined;
      this.form.newAdvocateList = undefined;
      this.newAdvocateList = undefined;
      //重新赋值客户
      this.form.userCodeList = undefined;
      this.userCodeList = undefined;
      //重新清空列表
      this.data = undefined;
      this.$refs.ruleForm.clearValidate();
    },
    // 查询客服列表
    getCustomerList() {
      this.$store
        .dispatch("customer/getInterfaceLists", {
          currentPage: 1,
          pageSize: 999,
        })
        .then((res) => {
          this.SelectCustomerList = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        });
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let newData = {};
          newData.currentPage = this.paginationProps.current;
          newData.pageSize = this.paginationProps.pageSize;
          newData.AssignMode = this.form.distributeWay;
          //指定客户 指定替换 随机替换 平均分配
          if (this.form.distributeWay === 1) {
            newData.advocateList = this.form.advocateList.split(" ");
            newData.channelCodeList = this.form.userCodeList;
            this.distinguish(newData);
          } else if (this.form.distributeWay === 2) {
            newData.formerAdvocateList = this.form.advocateList;
            newData.advocateList = this.form.newAdvocateList.split(" ");
            this.distinguish(newData);
          } else if (this.form.distributeWay === 3) {
            newData.formerAdvocateList = this.form.advocateList;
            newData.advocateList = this.form.newAdvocateList;
            this.distinguish(newData);
          } else if (this.form.distributeWay === 4) {
            if (this.form.advocateList.length < 2) {
              this.$message.warning("至少选择两个客服");
            } else {
              newData.advocateList = this.form.advocateList;
              this.distinguish(newData);
            }
          }
        }
      });
    },
    back() {
      this.$router.back();
    },
    //区分请求列表
    distinguish(data) {
      this.$store
        .dispatch("customer/distribute", data)
        .then((res) => {
          this.data = res.data;
          this.$message.success(res.msg);
        })
        .finally(() => {});
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      //选择的客服id
      this.advocateList= [],
      //筛选出的新客服
      this.newAdvocateList= [],
      //选择的客户id
      this.userCodeList= [],
      this.form = {
        advocateList: undefined,
        userCodeList: undefined,
        distributeWay: undefined,
        newAdvocateList: undefined,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.member-discount-update {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
    .content-two {
      width: 1300px;
      left: 50%;
      margin-left: -50%;
      .title {
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
    }
    .input-one {
      width: 320px;
    }
  }

  .member-contenttable {
    .status {
      font-size: 12px;
      color: #ffffff;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 18px;
    }
    .status0 {
      background-color: #ccc;
    }
    .status1 {
      background-color: #16b841;
    }
  }
}
</style>
