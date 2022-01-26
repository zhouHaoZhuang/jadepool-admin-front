// 默认请求地址
const baseUrl = {
  dev: "http://rps.dev.ydidc.com",
  test: "http://rps.test.ydidc.com",
  prod: "http://rps.prod.ydidc.com"
};
// authing接口参数
const authingReq = {
  dev: {
    appId: "619c93dc69a93fbb8a1faf8c",
    appHost: "https://resource-poor.authing.cn"
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
  ...authingReq[process.env.VUE_APP_ENV]
};
