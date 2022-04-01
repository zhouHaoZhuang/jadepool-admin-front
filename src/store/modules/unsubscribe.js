import request from "@/utils/request";

const unsubscribe = {
  namespaced: true,
  actions: {
    // 获取列表
    getList({ commit, state }, params) {
      return request({
        url: "/order",
        method: "get"
      });
    },
    //删除
    delList({ commit, state }, id) {
      return request({
        url: `/order/${id}`,
        method: "delete"
      });
    },
    //修改
    changeList({ commit, state }, data) {
      return request({
        url: `/order/${data.id}`,
        method: "put",
        data
      });
    },
    //新增
    addList({ commit, state }, params) {
      return request({
        url: "/order",
        method: "post",
        data: {
          ...params
        }
      });
    },
    //获取单个数据
    getOne({ commit, state }, id) {
      console.log(state);
      return request({
        url: `/order/one?id=${id}`,
        method: "get"
      });
    }
  }
};

export default unsubscribe;
