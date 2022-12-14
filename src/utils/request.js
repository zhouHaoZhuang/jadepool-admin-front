import axios from "axios";
import env from "@/config/env";
import message from "ant-design-vue/es/message";
import store from "@/store";
import { getDomainUrl } from "@/utils/index";
const axiosSource = axios.CancelToken.source();
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: env.BASE_URL,
  timeout: 10000 // 请求超时时间
});
const downloadUrl = [];

// 异常拦截处理器
const errorHandler = error => {
  console.log("error", error.response);
  return Promise.reject(error);
};

// request interceptor 请求拦截
request.interceptors.request.use(async config => {
  // 多个请求地址兼容
  // form，新的服务接口请求地址
  if (config.formService) {
    const authingId = store.state.user.userInfo.userCode;
    config.baseURL = env.FORM_BASE_URL;
    config.headers.system = "fs";
    config.headers["authing-id"] = authingId;
    config.headers.domain = getDomainUrl();
  }
  // bill，对账单接口请求地址
  if (config.billService) {
    config.baseURL = env.BILL_BASE_URL;
    config.headers.system = "settle";
    config.headers.domain = getDomainUrl();
  }
  config.cancelToken = axiosSource.token;
  const token = store.state.user.token;
  if (token) {
    // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
    config.headers["token"] = token;
  }
  // 头部携带ip
  const ip = localStorage.getItem("Ip");
  config.headers["ip"] = ip;
  return config;
}, errorHandler);

// response interceptor  响应拦截
request.interceptors.response.use(response => {
  if (
    response.config.url &&
    downloadUrl.some(item => response.config.url.indexOf(item) > -1)
  ) {
    console.log("export", response.config.url);
    return response;
  }
  const data = response.data;
  const errno = data.code;
  const errmsg = data.msg;
  if (errno !== "000000") {
    // 判断是否登录失效
    if (errno === "000001") {
      message.warning("登录已失效，请重新登录");
      store.dispatch("user/logout");
      window.location.replace("/login");
      return Promise.reject(data);
    }
    message.warning(errmsg);
    return Promise.reject(data);
  }
  return data;
}, errorHandler);

export default request;
