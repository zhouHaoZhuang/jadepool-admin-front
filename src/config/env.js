let VUE_APP_BASE_URL = "";
let appId = "619c93dc69a93fbb8a1faf8c";
let appHost = "https://resource-poor.authing.cn";

if (process.env.VUE_APP_ENV === "dev") {
  VUE_APP_BASE_URL = "http://rps.dev.ydidc.com";
  // VUE_APP_BASE_URL = "http://127.0.0.1:8080";
} else if (process.env.VUE_APP_ENV === "test") {
  VUE_APP_BASE_URL = "http://rps.dev.ydidc.com";
} else if (process.env.VUE_APP_ENV === "prod") {
  VUE_APP_BASE_URL = "http://rps.dev.ydidc.com";
}

export default {
  VUE_APP_BASE_URL,
  appId,
  appHost
};
