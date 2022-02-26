import { hasPermissionMenu, setAsyncRouteMenu } from "@/utils/permission";
import { loginIgnore } from "@/router/index";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  next();
};

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
  const { store, message } = options;
  // console.log("登录守卫", to, loginIgnore.includes(to), store.state.user.token);
  // 每次进入登录页面清除缓存
  if (to.path === "/login") {
    localStorage.clear();
  }
  if (!loginIgnore.includes(to) && !store.state.user.token) {
    message.warning("登录已失效，请重新登录");
    next({ path: "/login" });
  } else {
    next();
  }
};

/**
 * 权限守卫--只负责检测本地是否有权限数据
 * 同时获取下用户信息更新本地数据
 * @param to
 * @param form
 * @param next
 * @param options
 */
const permsGuard = async (to, from, next, options) => {
  const { store, message, router } = options;
  const perms = store.state.user.perms;
  const userInfo = store.state.user.userInfo;
  if (!loginIgnore.includes(to) && perms.length === 0) {
    // if (!loginIgnore.includes(to) && JSON.stringify(userInfo) === "{}") {
    // 获取用户信息
    await store.dispatch("user/getUserInfo");
    // 获取权限数据
    // await store.dispatch("user/getUserPerms");
    // 设置动态路由
    // const perms = store.state.user.perms;
    // setAsyncRouteMenu(perms, router, store);
  }
  next();
};

/**
 * 权限守卫--负责具体的权限菜单跳转控制
 * vuex中存储一下当前路由的$route的meta信息
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const { store, message, router } = options;
  const perms = store.state.user.perms;
  // if (!loginIgnore.includes(to) && !hasPermissionMenu(to, perms, router)) {
  //   message.warning(`对不起，您无权访问页面，请联系管理员`);
  //   next({ path: "/login" });
  //   NProgress.done();
  // }
  // 存储一下当前路由的$route的meta信息
  store.commit("setting/setRouteMeta", to.meta.perm);
  next();
};

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options;
  const getFirstChild = routes => {
    const route = routes[0];
    if (!route.children || route.children.length === 0) {
      return route;
    }
    return getFirstChild(route.children);
  };
  if (store.state.setting.layout === "mix") {
    const firstMenu = store.getters["setting/firstMenu"];
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit("setting/setActivatedFirst", to.fullPath);
      const subMenu = store.getters["setting/subMenu"];
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu);
        return next({ path: redirect.fullPath });
      }
    }
  }
  next();
};

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done();
  // document.body.scrollTop = 0
  // document.documentElement.scrollTop = 0
};

export default {
  beforeEach: [
    progressStart,
    loginGuard,
    permsGuard,
    authorityGuard,
    redirectGuard
  ],
  afterEach: [progressDone]
};
