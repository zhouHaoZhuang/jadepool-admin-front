import request from "@/utils/request";

const specification = {
  namespaced: true,
  state: {},

  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: `/itemSpecFamily`,
        method: "get",
        params
      });
    },
    // 获取信息
    getListas({ commit, state }, data) {
      return request({
        url: `/itemSpecFamily/${data}`,
        method: "get"
      });
    },
    // 增加产品规格族
    addItem({ commit, state }, data) {
      return request({
        url: `/itemSpecFamily`,
        method: "post",
        data
      });
    },
    // 修改产品规格族
    changeItem({ commit, state }, data) {
      return request({
        url: `/itemSpecFamily/${data.id}`,
        method: "patch",
        data
      });
    }
  }
};

export default specification;
