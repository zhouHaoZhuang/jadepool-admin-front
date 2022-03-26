// 默认请求地址
const baseUrl = {
  // local: "http://ntm.sailayun.com/rps",
  local: "/rps",
  dev: "/rps",
  test: "/rps",
  prod: "/rps"
};
// form服务接口请求地址
const formBaseUrl = {
  local: "http://ntm.sailayun.com/fs",
  // local:'/fs',
  dev: "/fs",
  test: "/fs",
  prod: "/fs"
};
const domains = {
  local: "t946471742443573248.site.sailayun.com"
};

export default {
  BASE_URL: baseUrl[process.env.VUE_APP_ENV],
  DOMAIN_URL: domains[process.env.VUE_APP_ENV],
  FORM_BASE_URL: formBaseUrl[process.env.VUE_APP_ENV]
};
