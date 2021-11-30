<template>
  <div class="enterprise-list-detail">
    <!-- 基础信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>基础资料</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">供应商实例ID:</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">企业名称:</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">采购账号：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">资源池实例ID：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">渠道商：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">企业：</div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <!-- 实例信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>实例信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">公网IP：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">内网IP:</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">所在区域：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">操作系统：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">登录名：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">远程端口：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">实例状态：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">运行状态：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">操作状态：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">备注：</div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <!-- 配置信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>配置信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">CPU：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">内存：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">带宽：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">数据磁盘：</div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <!-- 付费信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>付费信息</span>
      </div>
      <div class="bot-content">
        <div class="item">
          <div class="label">购买时间:</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">购买时长:</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">到期时间：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">续费方式：</div>
          <div class="value"></div>
        </div>
        <div class="item">
          <div class="label">备注：</div>
          <div class="value"></div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>订单信息</span>
      </div>
      <div class="bot-content1">
        <a-table :columns="columns" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
    <!-- 操作日志 -->
    <div class="tabs-content">
      <div class="top-title">
        <span>操作日志</span>
      </div>
      <div class="bot-content1">
        <a-table :columns="columnss" :data-source="data">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "订单标号",
          dataIndex: "name"
        },
        {
          title: "类型",
          dataIndex: "age"
        },
        {
          title: "时间",
          dataIndex: ""
        },
        {
          title: "订单金额",
          dataIndex: ""
        },
        {
          title: "配置信息",
          dataIndex: ""
        },
        {
          title: "查看",
          dataIndex: ""
        }
      ],
      columnss: [
        {
          title: "编号",
          dataIndex: "name"
        },
        {
          title: "操作",
          dataIndex: "age"
        },
        {
          title: "操作人",
          dataIndex: ""
        },
        {
          title: "时间",
          dataIndex: ""
        },
        {
          title: "详情",
          dataIndex: ""
        }
      ],
      data: [
      ]
    };
  },
  created() {
    this.getListas();
  },
  methods: {
    //获取
    getListas() {
      // console.log(this.$route.query.id);
      this.$store
        .dispatch("instance/getListas", { id: this.$route.query.id })
        .then(res => {
          this.data = { ...res.data };
        });
    }
  }
};
</script>

<style lang="less" scoped>
.enterprise-list-detail {
  .tabs-content {
    margin: 0 20px;
    background: #fff;
    .top-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      padding-left: 30px;
      padding-right: 15px;
      border-bottom: 1px solid #ccc;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .update {
        padding: 5px 10px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
    .bot-content {
      padding: 20px 30px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 33.3%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .label {
          width: 120px;
          text-align: right;
          margin-right: 8px;
        }
        .value {
          flex: 1;
        }
      }
      .item-row {
        width: 100%;
      }
    }
    .bot-content1 {
      padding: 20px 30px;
    }
  }
}
</style>
