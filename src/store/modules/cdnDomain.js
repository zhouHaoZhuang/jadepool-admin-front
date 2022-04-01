import request from "@/utils/request";

const cdnDomain = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    //---------------------------------------------------------cdn加速域名表
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/cdnDomain",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: `/cdnDomain`,
        method: "post",
        data
      });
    },
    // 删除
    del({ commit, state }, id) {
      return request({
        url: `/cdnDomain/${id}`,
        method: "delete"
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/cdnDomain/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取
    getId({ commit, state }, id) {
      return request({
        url: `/cdnDomain/${id}`,
        method: "get"
      });
    },
    // 上下线操作
    onlineOrOffline({ commit, state }, data) {
      return request({
        url: `/cdnDomain/onlineOrOffline`,
        method: "post",
        data
      });
    }
  }
};

export default cdnDomain;
