<template>
  <div class="channel-list-detail">
    <div class="tabs">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="渠道详情">
          <div class="tabs-content">
            <div class="top-title">
              <span>基础资料</span>
              <div class="update" @click="showModalDetail">修改基础资料</div>
            </div>
            <div class="bot-content">
              <div class="item">
                <div class="label">渠道商ID:</div>
                <div class="value">{{ detail.id }}</div>
              </div>
              <div class="item">
                <div class="label">全称:</div>
                <div class="value">{{ detail.cutomerName }}</div>
              </div>
              <div class="item">
                <div class="label">简称:</div>
                <div class="value">{{ detail.shortName }}</div>
              </div>
              <div class="item">
                <div class="label">项目网址:</div>
                <div class="value">{{ detail.addressProject }}</div>
              </div>
              <div class="item">
                <div class="label">联系人:</div>
                <div class="value">{{ detail.contract }}</div>
              </div>
              <div class="item">
                <div class="label">电话:</div>
                <div class="value">{{ detail.number }}</div>
              </div>
              <div class="item">
                <div class="label">描述:</div>
                <div class="value">{{ detail.description }}</div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="开放平台信息">
          <div class="tabs-content">
            <div class="top-title">
              <span>接口信息</span>
              <div class="update" @click="showModal">修改接口信息</div>
            </div>
            <div class="bot-content">
              <div class="item">
                <div class="label">接口地址:</div>
                <div class="value">C00001</div>
              </div>
              <div class="item">
                <div class="label">AccessKey ID:</div>
                <div class="value">xxxxxxxx公司</div>
              </div>
              <div class="item">
                <div class="label">AccessKey Secret:</div>
                <div class="value">公司</div>
              </div>
              <div class="item item-row">
                <div class="label">回调地址:</div>
                <div class="value">www.baidu.com</div>
              </div>
              <div class="item item-row">
                <div class="label">授权IP:</div>
                <div class="value">张三</div>
              </div>
              <div class="item item-row">
                <div class="label">备注:</div>
                <div class="value">150150150150</div>
              </div>
            </div>
          </div>
        </a-tab-pane> -->
      </a-tabs>
    </div>
    <!-- 修改基础资料弹窗 -->
    <a-modal
      title="修改基础资料"
      width="650px"
      :visible="visibleDetail"
      :confirm-loading="confirmLoadingDetail"
      @ok="handleOkDetail"
      @cancel="handleCancelDetail"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="渠道商ID">
          {{ detail.id }}
        </a-form-model-item>
        <a-form-model-item label="渠道商全称" prop="cutomerName">
          <a-input v-model="form.cutomerName" />
        </a-form-model-item>
        <a-form-model-item label="简称" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="项目地址">
          <a-input v-model="form.addressProject" />
        </a-form-model-item>
        <a-form-model-item label="联系人">
          <a-input v-model="form.contract" />
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="form.number" maxlength="11" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.description" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 修改接口信息弹窗 -->
    <a-modal
      title="修改接口信息"
      width="650px"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="apiForm"
        :model="apiForm"
        :rules="apiRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="接口地址">
          C00001
        </a-form-model-item>
        <a-form-model-item label="AccessKey ID">
          C00001
        </a-form-model-item>
        <a-form-model-item label="AccessKey Secret" prop="name">
          <a-input v-model="apiForm.name" />
          <div class="channel-detail-resetKey">快速重置Secret</div>
        </a-form-model-item>
        <a-form-model-item label="回调地址" prop="name1">
          <a-input v-model="apiForm.name1" />
        </a-form-model-item>
        <a-form-model-item label="授权IP">
          <a-input v-model="apiForm.web" />
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-input v-model="apiForm.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    const validateShortName = (rule, value, callback) => {
      if (value.length >= this.form.cutomerName.length) {
        callback(new Error("简称长度不可以大于全称长度"));
      } else {
        callback();
      }
    };
    return {
      detail: {},
      apiDetail: {},
      visibleDetail: false,
      confirmLoadingDetail: false,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      },
      rules: {
        cutomerName: [
          {
            required: true,
            message: "请输入渠道商全称",
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: "请输入简称",
            trigger: ["blur", "change"]
          },
          { validator: validateShortName, trigger: ["blur", "change"] }
        ]
      },
      apiForm: {
        name: "",
        name1: "",
        web: "",
        desc: ""
      },
      apiRules: {
        name: [
          {
            required: true,
            message: "请输入AccessKey Secret",
            trigger: "blur"
          }
        ],
        name1: [
          {
            required: true,
            message: "请输入回调地址",
            trigger: "blur"
          }
        ]
      },
      phoneReg: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    };
  },
  activated() {
    this.getDetail();
  },
  methods: {
    // 获取基础资料详情
    getDetail() {
      this.$store
        .dispatch("channel/getDetail", { id: this.$route.query.id })
        .then(res => {
          this.detail = { ...res.data };
        });
    },
    // 获取接口信息详情
    getApiDetail() {
      this.$store.dispatch("").then(res => {
        this.apiDetail = { ...res.data };
      });
    },
    // tabs切换回调
    callback(key) {
      console.log(key);
    },
    // 修改基础信息事件
    showModalDetail() {
      this.form = { ...this.detail };
      this.visibleDetail = true;
    },
    handleOkDetail(e) {
      if (this.form.number !== "" && !this.phoneReg.test(this.form.number)) {
        this.$message.warning("请输入格式正确的手机号");
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoadingDetail = true;
          this.$store
            .dispatch("channel/edit", this.form)
            .then(res => {
              this.$message.success("修改基础信息成功");
              this.detail = { ...res.data };
            })
            .finally(() => {
              this.handleCancelDetail();
              this.confirmLoadingDetail = false;
            });
        }
      });
    },
    handleCancelDetail(e) {
      this.visibleDetail = false;
      this.$refs.ruleForm.clearValidate();
    },
    // 修改接口信息
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.$refs.apiForm.validate(valid => {
        if (valid) {
          console.log(valid, this.apiForm);
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
      this.$refs.apiForm.clearValidate();
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-detail {
  margin-top: -24px;
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
  }
}
</style>
<style lang="less">
.channel-list-detail {
  .ant-tabs-bar {
    background: #fff;
    border-bottom: none !important;
    padding-left: 24px;
  }
}
.channel-detail-resetKey {
  color: #1890ff;
  line-height: 15px;
}
</style>
