import request from "@/utils/request";

const territory = {
  namespaced: true,
  state: {},
  mutations: {},

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/productRegion",
        method: "get",
        params
      });
    },
    // 新增
    add({ commit, state }, data) {
      return request({
        url: `/productRegion`,
        method: "post",
        data
      });
    },
    // 删除
    del({ commit, state }, ids) {
      return request({
        url: `/productRegion/${ids}`,
        method: "delete",
      });
    },
    // 编辑
    edit({ commit, state }, data) {
      return request({
        url: `/productRegion/${data.id}`,
        method: "patch",
        data
      });
    },
    //获取
    getId({ commit, state }, id) {
        return request({
          url: `/productRegion/${id}`,
          method: "get",
        });
      },
  }
};

export default territory;
