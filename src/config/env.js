// 默认请求地址
const baseUrl = {
  dev: "http://ntm.ydidc.com/server",
  test: "http://ntm.zjyundun.com/server",
  prod: "http://ntm.zjyundun.com/server"
};
// form服务接口请求地址
const formBaseUrl = {
  dev: "http://site.ydidc.com/server/form",
  test: "http://www.zjyundun.com/server/form",
  prod: "http://www.zjyundun.com/server/form"
};
// 租户请求地址（idc）
const idcUrl = {
  dev: "http://site.ydidc.com/server",
  test: "http://site.zjyundun.com/server",
  prod: "http://site.zjyundun.com/server"
};
const domains = {
  dev: "localhost"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV],
  IDC_BASE_URL: idcUrl[process.env.VUE_APP_ENV]
};
