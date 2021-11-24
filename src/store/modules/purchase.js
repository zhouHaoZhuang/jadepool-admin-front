import request from "@/utils/request";

const purchase = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取采购
    getList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount",
        method: "get",
        params
      });
    },
    // 新增采购
    add({ commit, state }, data) {
      return request({
        url: "/purchaseAccount",
        method: "post",
        data
      });
    },
    // 编辑采购
    edit({ commit, state }, data) {
      return request({
        url: `/purchaseAccount/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除采购
    updateStatus({ commit, state }, data) {
      return request({
        url: `/purchaseAccount/${data.ids}`,
        method: "delete",
        data
      });
    },
  // 获取采购id
  getId({ commit, state }, id) {
    return request({
      url: `/purchaseAccount/one?id=${id}`,
      method: "get",
    });
  },
  }
};

export default purchase;
