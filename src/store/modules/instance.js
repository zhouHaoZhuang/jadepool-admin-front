import request from "@/utils/request";

const instance = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getLists({ commit, state }, params) {
      return request({
        url: "/ecsProductStock/getEcsInstanceList",
        method: "get",
        params
      });
    },
    // 获取信息
    getListas({ commit, state }, data) {
        return request({
          url: `/ecsProductStock/getOneEcsDetail/${data.id}`,
          method: "get",
        });
      },
  }
};

export default instance;
