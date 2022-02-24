<template>
  <div class="tenant-detail-container">
    <div class="header">
      <h1>
        <img
          class="tenantImg"
          src="../../../assets/img/tenant/tenant.png"
          alt=""
        />
        渠道商名称：{{ detail.channelName }}
      </h1>
    </div>
    <div class="base-info">
      <a-card title="基础资料" :headStyle="tStyle" :bordered="false">
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <span class="formats">渠道商ID：</span> {{ detail.channelCode }}
          </a-col>
          <a-col :span="8">
            <span class="formats">全称：</span> {{ detail.channelName }}
          </a-col>
          <a-col :span="8">
            <span class="formats">项目网址：</span> {{ detail.sld }}
          </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <span class="formats">联系人：</span> {{ detail.channelAdminName }}
          </a-col>
          <a-col :span="8">
            <span class="formats">电话：</span> {{ detail.channelAdminPhone }}
          </a-col>
          <a-col :span="8"> <span class="formats">描述：</span> 无 </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="station-info">
      <a-card title="站点信息" :headStyle="tStyle" :bordered="false">
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <span class="formats">二级域名：</span>
            <a-input style="width:300px" v-model="detail.sld" />
          </a-col>
          <a-col :span="8">
            <span class="formats">cname地址：</span>
            <a-input style="width:300px" v-model="detail.cname" />
          </a-col>
          <a-col :span="8" class="flex">
            <span class="formats">站点状态：</span>
            <span :class="detail.channelStatus === 1 ? 'blue' : 'red'">{{
              detail.channelStatus === 1 ? "正常" : "冻结"
            }}</span>
          </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <span class="formats">自定义域名：</span>
            <a-input style="width:300px" v-model="detail.definedDomain" />
          </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="16" class="certificate">
            <div class="text">上传域名证书：</div>
            <Upload
              :defaultFile="detail.certificate"
              @change="handleImgChange"
            />
          </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
          <a-col :span="16" class="certificate">
            <div class="detail-btn">
              <a-button type="primary" @click="changeInfo()">修改信息</a-button>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index.vue";
export default {
  data() {
    return {
      detail: {},
      tStyle: { "font-weight": "bold" }
    };
  },
  components: {
    Upload
  },
  activated() {
    this.getDetailList();
  },
  methods: {
    // 获取渠道详情
    getDetailList() {
      let id = this.$route.query.id;
      this.$store
        .dispatch("tenant/getDetail", {
          id
        })
        .then(res => {
          this.detail = {
            ...res.data,
            certificate: res.data.certificate
              ? res.data.certificate.split(",")
              : []
          };
        });
    },
    // 上传图片
    handleImgChange({ urlList, firstImageUrl }) {
      console.log(urlList);
      this.detail.certificate = [...urlList];
    },
    // 修改站点信息
    changeInfo() {
      this.$store
        .dispatch("tenant/edit", {
          ...this.detail,
          certificate: this.detail.certificate.join(",")
        })
        .then(res => {
          console.log(res);
          this.$message.success("修改域名证书成功");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.tenant-detail-container {
  .formats {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .header h1 {
    background: #fff;
    padding: 20px;
    margin: 0 24px;
    font-weight: 700;
    .tenantImg {
      width: 28px;
      height: 28px;
      margin: 0 8px 0 20px;
    }
  }
  .base-info {
    background: #fff;
    padding: 0 20px;
    margin: 20px 24px;
  }
  .station-info {
    background: #fff;
    padding: 0 20px;
    margin: 20px 24px;
    input {
      border-style: none;
      border: 1px solid #ccc;
      outline: none;
    }

    .red,
    .blue {
      position: relative;
      margin-left: 10px;
    }
    .red::before {
      content: " ";
      display: inline-block;
      position: absolute;
      top: 50%;
      left: -30%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      line-height: 18px;
      border-radius: 50%;
      background-color: red;
    }
    .blue::before {
      content: " ";
      display: inline-block;
      position: absolute;
      top: 50%;
      left: -30%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      margin-right: 5px;
      border-radius: 50%;
      background-color: #108ee9;
    }
    .certificate {
      display: flex;
    }
    .text {
      text-align: right;
      width: 100px;
    }
    .detail-btn {
      margin-left: 100px;
    }
  }
}
</style>
