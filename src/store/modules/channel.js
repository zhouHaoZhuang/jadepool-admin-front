import request from "@/utils/request";

const channel = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 渠道列表---------------------------------------------------------
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
    },
    // 渠道价格---------------------------------------------------------
    // 获取渠道价格列表
    getPriceList({ commit, state }, params) {
      return request({
        url: "/channelPrice",
        method: "get",
        params
      });
    },
    // 新增产品采购价格
    addPrice({ commit, state }, data) {
      return request({
        url: "/channelPrice",
        method: "post",
        data
      });
    },
    // 获取详情(单个渠道价格数据)
    getPriceDetail({ commit, state }, data) {
      return request({
        url: `/channelPrice/${data.id}`,
        method: "get"
      });
    },
    // 编辑产品采购价格
    editPrice({ commit, state }, data) {
      return request({
        url: `/channelPrice/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除产品采购价格
    delPrice({ commit, state }, data) {
      return request({
        url: `/channelPrice/${data.id}`,
        method: "delete",
        data
      });
    },
    // 企业列表---------------------------------------------------------
    // 获取企业列表
    getEnterpriseList({ commit, state }, params) {
      return request({
        url: "/terminalCorporation",
        method: "get",
        params
      });
    },
    // 获取企业详情(单个企业数据)
    getEnterpriseDetail({ commit, state }, data) {
      return request({
        url: `/terminalCorporation/${data.id}`,
        method: "get"
      });
    },
    // 冻结/解冻
    updateEnterpriseStatus({ commit, state }, data) {
      return request({
        url: `/terminalCorporation/${data.id}`,
        method: "patch",
        data
      });
    }
  }
};

export default channel;
