// 默认请求地址
const baseUrl = {
  local: "/server",
  dev: "/server",
  test: "/server",
  prod: "/server"
};
// form服务接口请求地址
const formBaseUrl = {
  local: "/form",
  dev: "/server/form",
  test: "/server/form",
  prod: "/server/form"
};
const domains = {
  local: "localhost"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV]
};
