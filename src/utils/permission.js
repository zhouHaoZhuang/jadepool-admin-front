import { basicRoute, asyncRoute, resetRouter } from "@/router/config";
import clonedeep from "lodash.clonedeep";
// 循环处理路由菜单
function getNewRoute(route, perms) {
  let newData = route.filter(ele => hasPermissionMenu(ele, perms));
  newData.forEach(
    item => item.children && (item.children = getNewRoute(item.children, perms))
  );
  return newData;
}
// 处理动态路由菜单
export const setAsyncRouteMenu = (perms, router, store) => {
  // 根据权限生成新的菜单
  const newData = clonedeep(asyncRoute);
  const newRoute = getNewRoute(newData[0].children, perms);
  // 重置本地存储中菜单数据
  store.commit("setting/setMenuData", newRoute);
  const result = [...basicRoute, { ...newData[0], children: [...newRoute] }];
  // 重置之前的路由
  resetRouter(router);
  router.addRoutes(result);
};
// 判断处理路由是否可以成功跳转--也可得出是否有这个路由菜单
export const hasPermissionMenu = (to, perms) => {
  if (!to.meta.perm) {
    return false;
  }
  const index = perms.findIndex(
    ele => ele.code.replace(":*", "") === to.meta.perm
  );
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
};
