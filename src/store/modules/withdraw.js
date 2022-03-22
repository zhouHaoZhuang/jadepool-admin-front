import request from "@/utils/request";

const withdraw = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    //-------------------------------瑶池的提现申请
     // 查询提现申请记录
     getApplyList({ commit, state }, params) {
      return request({
        url: "/pcWithdrawRecord",
        method: "get",
        params
      });
    },
    // 新增申请
    addApply({ commit, state }, data) {
      return request({
        url: "/pcWithdrawRecord",
        method: "post",
        data
      });
    },
    // 编辑申请
    editApply({ commit, state }, data) {
      return request({
        url: `/pcWithdrawRecord/patchUserWithdraw/${data.id}`,
        method: "patch",
        data
      });
    },
    // 删除提现申请
    delApply({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/${id}`,
        method: "delete"
      });
    },
    //获取提现申请详情
    getApplyDetail({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/${id}`,
        method: "get"
      });
    },
    //接收申请
    receiveApply({ commit, state }, id) {
      return request({
        url: `/pcWithdrawRecord/receive/${id}`,
        method: "get"
      });
    },
    //审批流程（驳回传3）
    approval({ commit, state }, data) {
      return request({
        url: `/pcWithdrawRecord/approval/${data.id}`,
        method: "patch",
        data
      });
    },


  }
};

export default withdraw;
