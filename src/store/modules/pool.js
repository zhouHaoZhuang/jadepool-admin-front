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
  getList({ commit, state }, params) {
      // console.log(state);
    //   commit("SET_USERINFO", { name: "管理员" });
    return request({
        url: "/productDetail",
        method: "get",
      });
      // console.log(data.data.list);
      // commit("SET_POOL", data.data.list);
    },
    delList({ commit, state }, id) {
      console.log(state);
    //   commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: `/productDetail/${id}`,
        method: "delete",
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/productDetail/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      console.log(state);
      // commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "/productDetail",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      // commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: `/productDetail/one?id=${id}`,
        method: "get",
      });
    }
  }
};

export default pool;
