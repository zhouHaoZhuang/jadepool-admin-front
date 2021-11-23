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
      // console.log(state.poolList,'state');
    },
  },

  actions: {
    // 获取列表
   async getList({ commit, state }, params) {
      // console.log(state);
    //   commit("SET_USERINFO", { name: "管理员" });
      let data = await request({
        url: "http://8.136.205.83:8080/productDetail",
        method: "get",
      });
      // console.log(data.data.list);
      commit("SET_POOL", data.data.list);
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
