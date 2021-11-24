import request from "@/utils/request";

const purchase = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount",
        method: "get",
        params
      });
    },
    // 新增供应商
    add({ commit, state }, data) {
      return request({
        url: "/purchaseAccount",
        method: "post",
        data
      });
    },
    // 编辑供应商
    edit({ commit, state }, data) {
      return request({
        url: `/purchaseAccount/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除供应商
    updateStatus({ commit, state }, data) {
      return request({
        url: `/purchaseAccount/${data.ids}`,
        method: "delete",
        data
      });
    }
  }
};

export default purchase;
