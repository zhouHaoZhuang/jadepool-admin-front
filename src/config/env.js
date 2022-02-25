// 默认请求地址
const baseUrl = {
  local: "http://ntm.ydidc.com/server",
  dev: "/server",
  test: "/server",
  prod: "/server"
};
// form服务接口请求地址
const formBaseUrl = {
  local: "http://site.ydidc.com/server/form",
  dev: "/server/form",
  test: "/server/form",
  prod: "/server/form"
};
const domains = {
  local: "t946471742443573248.site.ydidc.com"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV]
};
