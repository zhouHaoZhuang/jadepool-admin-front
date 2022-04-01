<template>
  <div class="orderList">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="day" tab="账单流水">
        <div class="public-header-wrap">
          <a-form-model layout="inline" :model="listQuery">
            <a-form-model-item>
              <a-select
                class="sechkey"
                style="width:150px"
                placeholder="请选择"
                v-model="listQuery.key"
                allowClear
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
            <a-form-model-item>
              <a-input
                allowClear
                placeholder="请输入"
                v-model="listQuery.search"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-range-picker
                style="margin-right: 10px"
                show-time
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="datePickerOnOk"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="handleSearch">
                查询
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-tab-pane>
      <a-tab-pane key="month" tab="月账单" force-render>
        <div class="public-header-wrap">
          <a-form-model layout="inline" :model="listQuery">
            <!-- <a-form-model-item>
              <a-select
                class="sechkey"
                style="width:150px"
                placeholder="请选择"
                v-model="listQuery.key"
                allowClear
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
            <a-form-model-item>
              <a-input
                allowClear
                placeholder="请输入"
                v-model="listQuery.search"
              />
            </a-form-model-item> -->
            <a-form-model-item>
              <!--  :defaultValue="moment(getCurrentData(), 'YYYY-MM')" -->
              <a-month-picker placeholder="请选择账期" @change="onChange" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="handleSearch">
                查询
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div class="orderTable">
      <div>
        <a-table
          :columns="
            listQuery['qp-billType-eq'] == 'day' ? columnsDay : columnsMonth
          "
          :data-source="data"
          :loading="tableLoading"
          :pagination="paginationProps"
          :scroll="{ x: 1400 }"
        >
          <span slot="corporationCode" slot-scope="text" style="color: #00aaff">
            {{ text }}
          </span>
          <div v-if="text" slot="originAmount" slot-scope="text">
            {{ text }}
          </div>
          <div slot="useData" slot-scope="text, record">
            {{ text }}{{ record.unitPricePerUnit }}
          </div>
          <div slot="channelName" slot-scope="text, record">
            {{ record.channelName }}
            <br />
            <span style="color:#ccc">{{ record.corporationCode }}</span>
          </div>
          <div slot="shopName">
            阿里云
          </div>
          <span slot="customTitle">
            支付状态
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  未结算：已消费，未出帐的账单<br />
                  未结清：已出帐，未支付的账单</span
                >
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <span slot="customTitle" slot-scope="text, record">
            {{ record.owe == "0.00" ? "已结清" : "未结清" }}
          </span>
          <span slot="channel" slot-scope="text" style="color: #00aaff">
            {{ text }}
          </span>
          <div v-if="text" slot="actualAmount" slot-scope="text">
            {{ text }}
          </div>
          <span slot="actualAmount">
            账单金额
            <a-tooltip placement="top">
              <template slot="title">
                <span> 账单金额=单价*实际用量</span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <span slot="originAmount">
            成本金额
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  成本金额=渠道折扣金额*实际用量
                </span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <span slot="owe">
            欠费金额
            <a-tooltip placement="top">
              <template slot="title">
                <span>
                  已出帐未结清的金额
                </span>
              </template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <div slot-scope="text" slot="actualPrice" v-if="text != undefined">
            {{ text.toFixed(2) }}
          </div>
          <div slot-scope="text" slot="owe" v-if="text != undefined">
            {{ text.toFixed(2) }}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { orderStatusEnum, orderTypeMap } from "@/utils/enum.js";
export default {
  data() {
    return {
      orderStatusEnum,
      orderTypeMap,
      listQuery: {
        key: undefined,
        search: "",
        startTime: "",
        endTime: "",
        "qp-billType-eq": "day",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columnsDay: [
        {
          title: "账单编号",
          dataIndex: "billNo"
        },
        {
          title: "订单编号",
          dataIndex: "orderNo"
        },
        // {
        //   title: "所属终端客户",
        //   dataIndex: "channelName",
        //   width: 190,
        //   scopedSlots: { customRender: "channelName" }
        // },
        {
          title: "云厂商",
          dataIndex: "shopName",
          width: 190,
          scopedSlots: { customRender: "shopName" }
        },
        {
          title: "单价",
          dataIndex: "unitPrice",
          scopedSlots: { customRender: "unitPrice" }
        },
        {
          title: "单价单位",
          dataIndex: "unitPricePerUnit",
          scopedSlots: { customRender: "unitPricePerUnit" }
        },
        {
          //账单金额
          dataIndex: "actualAmount",
          slots: { title: "actualAmount" }
        },
        // {
        //   //成本金额
        //   dataIndex: "originAmount",
        //   slots: { title: "originAmount" }
        // },
        // {
        //   //欠费金额
        //   slots: { title: "owe" },
        //   dataIndex: "owe"
        // },
        {
          title: "消费时间",
          dataIndex: "consumeTime",
          sorter: (a, b) =>
            new Date(a.consumeTime).getTime() -
            new Date(b.consumeTime).getTime()
        },
        {
          title: "计费项",
          dataIndex: "billItem"
        },
        {
          title: "实际用量",
          dataIndex: "useData",
          scopedSlots: { customRender: "useData" }
        }
      ],
      columnsMonth: [
        {
          title: "账期",
          // colSpan:0,     //隐藏表头
          dataIndex: "billPeriod"
        },
        // {
        //   title: "所属渠道商",
        //   dataIndex: "channelName",
        //   width: 190,
        //   scopedSlots: { customRender: "channelName" }
        // },
        {
          title: "云厂商",
          dataIndex: "shopName",
          width: 190,
          scopedSlots: { customRender: "shopName" }
        },
        {
          title: "计费项",
          dataIndex: "billItem"
        },
        {
          title: "单价",
          dataIndex: "unitPrice",
          scopedSlots: { customRender: "unitPrice" }
        },
        {
          title: "单价单位",
          dataIndex: "unitPricePerUnit",
          scopedSlots: { customRender: "unitPricePerUnit" }
        },
        {
          title: "实际用量",
          dataIndex: "useData",
          scopedSlots: { customRender: "useData" }
        },
        {
          //账单金额
          dataIndex: "actualAmount",
          slots: { title: "actualAmount" }
        },
        {
          //成本金额
          dataIndex: "originAmount",
          slots: { title: "originAmount" }
        },
        {
          //欠费金额
          slots: { title: "owe" },
          dataIndex: "owe"
        }
      ],
      data: [],
      // 表格分页器配置
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      }
    };
  },
  activated() {
    this.getList();
  },
  created() {
    this.getCurrentData();
  },
  computed: {
    useColumns() {
      return [
        {
          title: "账单编号",
          dataIndex: "billNo",
          key: "billNo",
          width: 170
        },
        {
          title: "订单编号",
          dataIndex: "orderNo",
          key: "orderNo",
          width: 170
        }
      ];
    },
  },
  methods: {
    moment,
    //查询表格数据
    getList() {
      console.log(this.listQuery["qp-billPeriod-eq"]);
      this.tableLoading = true;
      this.$getListQp("financialOrder/getBillList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
          this.data.forEach(element => {
            element.consumeTime = moment(element.consumeTime).format("YYYY-MM-DD");
          });
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    onChange(value) {
      this.listQuery["qp-billPeriod-eq"] = moment(value).format("YYYY-MM-DD");
    },
    //切换tab
    callback(key) {
      this.listQuery = { currentPage: 1, pageSize: 10, total: 0 };
      this.listQuery["qp-billType-eq"] = key;

      this.getList();
    },
    // 搜索
    handleSearch() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    //账单选择默认日期
    getCurrentData() {
      var nowMonth = new Date().getMonth();
      // 对月份进行处理，1-9月在前面添加一个“0”
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      if (this.listQuery["qp-billType-eq"] == "month") {
        this.listQuery["qp-billPeriod-eq"] =
          new Date().getFullYear() + "-" + nowMonth;
      }
      return new Date().getFullYear() + "-" + nowMonth;
    },
    // 日期选择
    datePickerOnOk(value) {
      if (value.length !== 0) {
        this.listQuery["qp-consumeTime-ge"] = moment(value[0]).format(
          "YYYY-MM-DD"
        );
        this.listQuery["qp-consumeTime-le"] = moment(value[1]).format(
          "YYYY-MM-DD"
        );
      } else {
        this.listQuery["qp-consumeTime-ge"] = "";
        this.listQuery["qp-consumeTime-le"] = "";
      }
    },
    // 禁用日期--禁用当天之后+当天前一个月所有
    disabledDate(current) {
      return current > moment() || current < moment().subtract(1, "month");
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
    }
  }
};
</script>

<style lang="less" scoped>
.orderList {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .orderTop {
    display: flex;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-right: 10px;
    }
    [type="button"] {
      margin-left: 10px;
    }
    .zhi {
      margin: 10px;
    }
  }
  .orderTable {
    .green {
      background-color: rgb(115, 209, 61);
      color: rgb(255, 255, 255);
      font-size: 12px;
      padding: 2px 5px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    .blue {
      background-color: rgb(64, 169, 255);
      color: rgb(255, 255, 255);
      font-size: 12px;
      padding: 2px 5px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
