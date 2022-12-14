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
        url: `/order?qp-tradeType-ne=55&qp-tradeType-ne=56`,
        method: "get",
        params
      });
    },
    //退订列表
    getUnList({ commit, state }, params) {
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
        url: `/order?key=createTime&search=${params.startTime}&currentPage=1&pageSize=10&total=0&qp-createTime-gt=${params.startTime}&qp-createTime-lt=${params.endTime}`,
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
    },
       // 财务-订单管理-采购账单列表
       getBillList({ commit, state }, params) {
        return request({
          url: `/bill`,
          method: "get",
          params
        });
      },
  }
};

export default financialOrder;
