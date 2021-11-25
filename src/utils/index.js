// 根据id返回数组中对应id的对象---挂载全局 $getArrOnceData
export const getArrOnceData = (id, arr) => {
  return arr.find(ele => ele.id === id);
};
