import request from "@/utils/request";

const tenant = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取表列,查询列表
    getList({ commit, state }, params) {
      return request({
        url: "/ccChannelCustomer",
        method: "get",
        params,
        idc: true
      });
    },
    // 获取详情
    getDetail({ commit, state }, data) {
      return request({
        url: `/ccChannelCustomer/${data.id}`,
        method: "get",
        idc: true
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/ccChannelCustomer/${data.id}`,
        method: "patch",
        data,
        idc: true
      });
    }
  }
};

export default tenant;
