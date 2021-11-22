import axios from "axios";
import env from "@/config/env";
// import message from "ant-design-vue/es/message";
// import store from "@/store";
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: env.VUE_APP_BASE_URL,
  timeout: 3000 // 请求超时时间
});
const downloadUrl = [];

// 异常拦截处理器
const errorHandler = error => {
  console.log("error", error.response);
  return Promise.reject(error);
};

// request interceptor 请求拦截
request.interceptors.request.use(config => {
  // const token = store.state.user.token
  // if (token) {
  //   // 让每个请求携带token-- ['ADMINTOKEN']为自定义key 请根据实际情况自行修改
  //   config.headers["ADMINTOKEN"] = token;
  // }
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
  // const errno = data.errno;
  // const errmsg = data.errmsg;
  // if (errno !== 200) {
  //   message.warning(errmsg);
  //   if (errno === 10001 || errno === 10006 || errno === 3) {
  //     store.dispatch("user/logout").then(() => {
  //       location.reload();
  //     });
  //   }
  //   return Promise.reject(data);
  // }
  return data;
}, errorHandler);

export default request;
