import request from "@/utils/request";

const refundmangage = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 获取充值记录列表
    getList({ commit, state }, params) {
      return request({
        url: "/channelInvoiceRecord/refund/page",
        method: "get",
        params,
      });
    },
    // 获取充值记录详情
    getDetail({ commit, state }, params) {
      return request({
        url: `/channelInvoiceRecord/${params.id}`,
        method: "get",
      });
    },
    // 审核确认
    audit({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/confirm/${data.id}`,
        method: "patch",
        data,
      });
    },
    // 审核拒绝
    refuse({ commit, state }, data) {
      return request({
        url: `/channelInvoiceRecord/reject/${data.id}`,
        method: "patch",
        data,
      });
    },
  },
};

export default refundmangage;
