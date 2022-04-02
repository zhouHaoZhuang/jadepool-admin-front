import request from "@/utils/request";

const recon = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取对账单列表
    getReconList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount",
        method: "get",
        params
      });
    },
    // 获取对账单详情
    getOneRecon({ commit, state }, params) {
      return request({
        url: "/purchaseAccount/" + params.id,
        method: "get"
      });
    },
    // 获取对账单明细
    getReconDetail({ commit, state }, params) {
      return request({
        url: "/purchaseAccount/" + params.id + "/detail",
        method: "get"
      });
    },
    // 对账单建议列表
    getActualList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount/" + params.id + "/actual",
        method: "get"
      });
    },
    // 获取实际对账单列表
    getRecomDataList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount/" + params.id + "/recomData",
        method: "get"
      });
    },
    // 拉去账单明细
    getReconDetailList({ commit, state }, params) {
      return request({
        url: "/purchaseAccount/" + params.id + "/detail",
        method: "get"
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
        method: "patch",
        data
      });
    },
    // 删除采购
    updateStatus({ commit, state }, data) {
      return request({
        url: `/purchaseAccount/${data.id}`,
        method: "delete",
        data
      });
    },
    // 获取采购id
    getId({ commit, state }, id) {
      return request({
        url: `/purchaseAccount/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default recon;
