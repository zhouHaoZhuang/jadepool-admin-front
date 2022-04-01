import request from "@/utils/request";

const pool = {
  namespaced: true,
  state: {
    poolList: [],
    userInfo: {}
  },

  mutations: {
    SET_POOL: (state, poolList) => {
      state.poolList = poolList;
      // console.log(state.poolList,'state');
    }
  },

  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/productDetail",
        method: "get",
        params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/productDetail/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/productDetail/${data.id}`,
        method: "patch",
        data
      });
    },
    addList({ commit, state }, params) {
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
      return request({
        url: `/productDetail/one?id=${id}`,
        method: "get"
      });
    },
    // 获取供应商产品列表
    getProductList({ commit, state }) {
      return request({
        url: `/productDetail/supplier/productInfo`,
        method: "get"
      });
    }
  }
};

export default pool;
