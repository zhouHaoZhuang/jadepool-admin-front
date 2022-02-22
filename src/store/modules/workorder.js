import request from "@/utils/request";

const workorder = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 工单管理-----start
    // 我的工单列表-全部+已解决
    myWorkOrderList({ commit, state }, data) {
      return request({
        url: `/workOrder/queryChannelPersonOrder`,
        method: "post",
        data,
        formService: true
      });
    },
    // 我的工单列表-处理中
    myWorkOrderList2({ commit, state }, data) {
      return request({
        url: `/workOrder/queryChannelPersonOrder/handler`,
        method: "post",
        data,
        formService: true
      });
    },
    // 我的工单列表-未处理
    myWorkOrderList1({ commit, state }, data) {
      return request({
        url: `/workOrder/queryResourceOrder/untreated`,
        method: "post",
        data,
        formService: true
      });
    },
    // 我的工单列表-移交的工单
    myWorkOrderList4({ commit, state }, data) {
      return request({
        url: `/workOrder/queryChannelPersonOrder/trans`,
        method: "post",
        data,
        formService: true
      });
    },
    // 工单详情
    workOrderDetail({ commit, state }, params) {
      return request({
        url: `/workOrder/${params.workOrderNo}`,
        method: "get",
        params,
        formService: true
      });
    },
    // 校验资源池当前登录人员是否可以接单
    verifyReceiving({ commit, state }, params) {
      return request({
        url: `/workOrder/judgeResourceAccept/${params.workOrderNo}`,
        method: "get",
        formService: true
      });
    },
    // 接单
    orderReceiving({ commit, state }, params) {
      return request({
        url: `/workOrder/resource/${params.workOrderNo}`,
        method: "get",
        formService: true
      });
    },
    // 获取资源池指定工作人员列表
    workOrderUserList({ commit, state }) {
      return request({
        url: `/systemUser`,
        method: "get"
      });
    },
    // 移动工单+转移到云技术客服
    moveWorkOrder({ commit, state }, data) {
      return request({
        url: `/orderTransferLog`,
        method: "post",
        data,
        formService: true
      });
    },
    // 关闭工单
    closeWorkOrder({ commit, state }, params) {
      return request({
        url: `/workOrder/close/${params.workOrderNo}`,
        method: "get",
        formService: true
      });
    },
    // 消息记录列表
    messageList({ commit, state }, params) {
      return request({
        url: `/workOrderReply`,
        method: "get",
        params,
        formService: true
      });
    },
    // 撤回回复
    messageDel({ commit, state }, data) {
      return request({
        url: `/workOrderReply/${data}`,
        method: "delete",
        formService: true
      });
    },
    // 客服发送一条消息
    sendMessage({ commit, state }, data) {
      return request({
        url: "/workOrderReply",
        method: "post",
        data,
        formService: true
      });
    },
    // 工单管理-----end
    // 工单设置-----start
    // 工单分类列表
    workOrderTypeList({ commit, state }, data) {
      return request({
        url: "/questionCategory/getList",
        method: "post",
        data,
        formService: true
      });
    },
    // 工单分类详情
    workOrderTypeDetail({ commit, state }, params) {
      return request({
        url: `/questionCategory/${params.id}`,
        method: "get",
        formService: true
      });
    },
    // 添加工单分类
    addWorkOrderType({ commit, state }, data) {
      return request({
        url: `/questionCategory/add`,
        method: "post",
        data,
        formService: true
      });
    },
    // 修改工单分类
    editWorkOrderType({ commit, state }, data) {
      return request({
        url: `/questionCategory/${data.id}`,
        method: "patch",
        data,
        formService: true
      });
    },
    // 删除工单分类
    delWorkOrderType({ commit, state }, data) {
      return request({
        url: `/questionCategory/delete/${data}`,
        method: "delete",
        formService: true
      });
    },
    // 快捷回复模板列表
    quickReplyList({ commit, state }, params) {
      return request({
        url: `/fastReply`,
        method: "get",
        params,
        formService: true
      });
    },
    // 快捷回复模板详情
    quickReplyDetail({ commit, state }, params) {
      return request({
        url: `/fastReply/${params.id}`,
        method: "get",
        formService: true
      });
    },
    // 添加快捷回复模板
    addQuickReply({ commit, state }, data) {
      return request({
        url: `/fastReply`,
        method: "post",
        data,
        formService: true
      });
    },
    // 修改快捷回复模板
    editQuickReply({ commit, state }, data) {
      return request({
        url: `/fastReply/${data.id}`,
        method: "put",
        data,
        formService: true
      });
    },
    // 批量删除快捷回复模板
    batchDel({ commit, state }, data) {
      return request({
        url: `/fastReply/${data}`,
        method: "delete",
        formService: true
      });
    },
    // 批量显示快捷回复模板
    batchShow({ commit, state }, data) {
      return request({
        url: `/fastReply/enable/${data}`,
        method: "put",
        formService: true
      });
    },
    // 批量隐藏快捷回复模板
    batchHide({ commit, state }, data) {
      return request({
        url: `/fastReply/disable/${data}`,
        method: "put",
        formService: true
      });
    }
    // 工单设置-----end
  }
};

export default workorder;
