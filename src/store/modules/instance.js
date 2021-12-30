import request from "@/utils/request";

const instance = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getLists({ commit, state }, data) {
      return request({
        url: `/ecsProductStock/getEcsInstanceList?pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
        method: "post",
        data
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
