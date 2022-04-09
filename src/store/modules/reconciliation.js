import request from "@/utils/request";

const reconciliation = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取退订记录列表
    getList({ commit, state }, data) {
      return request({
        url: "/bill/doPage",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取详情
    getData({ commit, state }, id) {
      return request({
        url: `/customer/${id}`,
        method: "get",
        billService: true
      });
    },
    // 删除
    del({ commit, state }, data) {
      return request({
        url: `/billDetail/${data.id}`,
        method: "delete",
        billService: true
      });
    },
    // 确认
    confirm({ commit, state }, data) {
      return request({
        url: `/bill/confirm/${data.id}`,
        method: "get",
        data,
        billService: true
      });
    },
    // 退回
    goBack({ commit, state }, data) {
      return request({
        url: `/bill/back/${data.billNo}`,
        method: "get",
        data,
        billService: true
      });
    },
    // 新增建议添加项
    addSteerItem({ commit, state }, data) {
      return request({
        url: "/billDetail/modify",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取开票明细
    getsteerList({ commit, state }, data) {
      return request({
        url: "/billDetail/getInitData",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取建议调整项
    getsteerListSteer({ commit, state }, data) {
      return request({
        url: "/billDetail/getAdjustData",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取实际调整项
    getsteerListActual({ commit, state }, data) {
      return request({
        url: "/billDetail/getRealAdjustDate",
        method: "post",
        data,
        billService: true
      });
    },
    // 获取金额
    getAmount({ commit, state }, data) {
      return request({
        url: "/billDetail/getTotal",
        method: "post",
        data,
        billService: true
      });
    },
    // 批量发布
    batchPublish({ commit, state }, data) {
      return request({
        url: "/bill/release",
        method: "post",
        data,
        billService: true
      });
    }
  }
};

export default reconciliation;
