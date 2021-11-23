import request from "@/utils/request";

const channel = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/channelCustomer",
        method: "get",
        params
      });
    },
    // 新增渠道
    add({ commit, state }, data) {
      return request({
        url: "/channelCustomer",
        method: "post",
        data
      });
    },
    // 获取详情(单个渠道数据)
    getDetail({ commit, state }, data) {
      return request({
        url: `/channelCustomer/${data.id}`,
        method: "get"
      });
    },
    // 编辑渠道
    edit({ commit, state }, data) {
      return request({
        url: `/channelCustomer/${data.id}`,
        method: "put",
        data
      });
    },
    // 冻结/解冻
    updateStatus({ commit, state }, data) {
      return request({
        url: `/channelCustomer/${data.id}`,
        method: "patch",
        data
      });
    }
  }
};

export default channel;
