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
        method: "get"
      });
    },
    // 搜索列表接口
    selectList({ commit, state }, data) {
      // console.log(data, "data");
      return request({
        url: `/productDetail?key=${data.key}&search=${data.search}&currentPage=${data.currentPage}&pageSize=${data.pageSize}&total=${data.total}&qp-${data.key}-${data.eq?'eq':'like'}=${data.search}`,
        method: "get"
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
        method: "put",
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
    }
  }
};

export default pool;
