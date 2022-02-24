import request from "@/utils/request";

const user = {
  namespaced: true,
  state: {
    token: "",
    userInfo: {},
    perms: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = { ...userInfo };
    },
    SET_PERMS: (state, perms) => {
      state.perms = [...perms];
    }
  },

  actions: {
    // 登录
    login({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: "/user/loginByUsername",
          method: "post",
          data
        })
          .then(res => {
            dispatch("getUserPerms");
            const token = res.data.token;
            commit("SET_TOKEN", token);
            dispatch("getUserInfo");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 发送验证码
    sendCode({ commit, state }, data) {
      return request({
        url: "/sms/sendSms",
        method: "post",
        data
      });
    },
    // 登出
    logout({ commit, state }) {
      return new Promise(resolve => {
        commit("SET_USERINFO", {});
        commit("SET_PERMS", []);
        commit("SET_TOKEN", "");
        resolve();
      });
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request({
          url: "/uc/getByToken",
          method: "get"
        })
          .then(res => {
            commit("SET_USERINFO", res.data);
            resolve(res.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登录后获取当前用户的权限数据
    getUserPerms({ commit, state }) {
      commit("SET_PERMS", [{ code: "*:*" }]);
      // return new Promise((resolve, reject) => {
      //   request({
      //     url: `/user/listAuthorizedResources`,
      //     method: "get"
      //   })
      //     .then(res => {
      //       commit("SET_PERMS", res.data.list);
      //       resolve();
      //     })
      //     .catch(error => {
      //       reject(error);
      //     });
      // });
    },
    //修改密码
    changePassword({ commit, state }, data) {
      return request({
        url: "/user/updatePassword",
        method: "post",
        data
      });
    }
  }
};

export default user;
