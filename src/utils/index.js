import store from "@/store";
// 根据id返回数组中对应id的对象---挂载全局 $getArrOnceData
export const getArrOnceData = (id, arr) => {
  return arr.find(ele => ele.id === id);
};
// 请求列表时前端要替后端做适配，并且有点多，封装请求列表时带有搜索的接口
export const getList = (request, listQuery) => {
  return new Promise((resolve, reject) => {
    store
      .dispatch(
        request,
        listQuery.key
          ? {
              ...listQuery,
              [`qp-${listQuery.key}-${
                listQuery.key === "id" ? "eq" : "like"
              }`]: listQuery.search
            }
          : listQuery
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
