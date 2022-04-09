import request from "@/utils/request";

const price = {
  namespaced: true,
  state: {
  },
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/productStandardPrice",
        method: "get"
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/productStandardPrice/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/productStandardPrice/${data.id}`,
        method: "patch",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/productStandardPrice",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      return request({
        url: `/productStandardPrice/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default price;
