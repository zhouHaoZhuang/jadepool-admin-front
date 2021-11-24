import request from "@/utils/request";

const provider = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/supplier",
        method: "get",
        params
      });
    },
    // 新增供应商
    add({ commit, state }, data) {
      return request({
        url: "/supplier",
        method: "post",
        data
      });
    },
    // 编辑供应商
    edit({ commit, state }, data) {
      return request({
        url: `/supplier/${data.id}`,
        method: "put",
        data
      });
    },
    // 删除供应商
    updateStatus({ commit, state }, data) {
      return request({
        url: `/supplier/${data.id}`,
        method: "delete",
        data
      });
    },
    //获取ID
    getId({ commit, state }, id) {
      return request({
        url: `/supplier/one?id=${id}`,
        method: "get",
      });
    },
  }
};

export default provider;
