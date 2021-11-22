// 视图组件
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView")
};

// 路由组件注册
const routerMap = {
  login: {
    authority: "*",
    path: "/login",
    component: () => import("@/pages/passport/login")
  },
  exp403: {
    authority: "*",
    name: "exp403",
    path: "403",
    component: () => import("@/pages/exception/403")
  },
  exp404: {
    name: "exp404",
    path: "404",
    component: () => import("@/pages/exception/404")
  },
  exp500: {
    name: "exp500",
    path: "500",
    component: () => import("@/pages/exception/500")
  },
  root: {
    path: "/",
    name: "首页",
    redirect: "/dashboard",
    component: view.tabs
  },
  home: {
    name: "后台首页",
    icon: "home",
    component: view.page
  }
};
export default routerMap;
