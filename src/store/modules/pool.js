import request from "@/utils/request";

const pool = {
  namespaced: true,
  state: {
    poolList:[],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
    },
  },

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      console.log(state);
    //   commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "http://8.136.205.83:8080/productDetail",
        method: "get",
      });
    },
    delList({ commit, state }, params) {
      console.log(state);
    //   commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "http://8.136.205.83:8080/productDetail",
        method: "delete",
        params: {
          ...params
        }
      });
    },
    changeList({ commit, state }, params) {
      console.log(state);
      // commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "http://8.136.205.83:8080/productDetail/map",
        method: "patch",
        params: {
          ...params
        }
      });
    },
    addList({ commit, state }, params) {
      console.log(state);
      // commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "http://8.136.205.83:8080/productDetail",
        method: "post",
        params: {
          ...params
        }
      });
    }
  }
};

export default pool;
