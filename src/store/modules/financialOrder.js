import request from "@/utils/request";

const financialOrder = {
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
        url: `/order`,
        method: "get",
        params
      });
    },
    getAllList({ commit, state }, params) {
      return request({
        url: `/order?pageSize=${params.pageSize}`,
        method: "get",
        params
      });
    },
    selectList({ commit, state }, params){
      return request({
        url: `/order?pageSize=${params.pageSize}`,
        method: "get",
        params
      });
    },
    delList({ commit, state }, id) {
      return request({
        url: `/order/${id}`,
        method: "delete"
      });
    },
    changeList({ commit, state }, data) {
      return request({
        url: `/order/${data.id}`,
        method: "put",
        data
      });
    },
    addList({ commit, state }, params) {
      return request({
        url: "/order",
        method: "post",
        data: {
          ...params
        }
      });
    },
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/order/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default financialOrder;
