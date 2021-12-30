let appId = "619c93dc69a93fbb8a1faf8c";
let appHost = "https://resource-poor.authing.cn";

// 默认请求地址
const baseUrl = {
  dev: "http://rps.dev.ydidc.com",
  test: "http://rps.test.ydidc.com",
  prod: "http://rps.prod.ydidc.com"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  appId,
  appHost
};
