// 默认请求地址
const baseUrl = {
  dev: "http://ntm.ydidc.com/server",
  test: "http://ntm.zjyundun.com/server",
  prod: "http://ntm.zjyundun.com/server"
};
// form服务接口请求地址
const formBaseUrl = {
  // dev: "http://www.ydidc.com/server/form",
  dev: "http://site.ydidc.com/server/form",
  test: "http://www.zjyundun.com/server/form",
  prod: "http://www.zjyundun.com/server/form"
};
const domains = {
  dev: "localhost"
};
// authing接口参数
const authingReq = {
  dev: {
    appId: "620e0dfc96b235290c48f824",
    appHost: "https://yaochi.authing.cn"
  },
  test: {
    appId: "61cc12c76803e93a5f5ba9f9",
    appHost: "https://resource-pool.authing.cn"
  },
  prod: {
    appId: "",
    appHost: ""
  }
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV],
  ...authingReq[process.env.VUE_APP_ENV]
};
