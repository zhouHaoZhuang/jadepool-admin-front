import request from "@/utils/request";

const order = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
    }
  },

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/orderRoute",
        method: "get"
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/orderRoute/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/orderRoute/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/orderRoute",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/orderRoute/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default order;
