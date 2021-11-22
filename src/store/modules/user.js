import request from "@/utils/request";

const user = {
  namespaced: true,
  state: {
    token: "qwertyuiop",
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = { ...userInfo };
    }
  },

  actions: {
    // 登录
    login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: "/login",
          method: "post",
          data
        })
          .then(res => {
            const token = res.data;
            commit("SET_TOKEN", token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    logout({ commit, state }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        resolve();
      });
    },
    // 获取列表
    getList({ commit, state }, params) {
      console.log(state);
      commit("SET_USERINFO", { name: "管理员" });
      return request({
        url: "/common/Handler.ashx",
        method: "get",
        params: {
          ...params
        }
      });
    }
  }
};

export default user;
