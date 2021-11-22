import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/passport/login")
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404")
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403")
    },
    {
      path: "/500",
      name: "500",
      component: () => import("@/pages/exception/500")
    },
    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/dashboard",
      children: [
        // 首页 一级菜单
        {
          path: "/dashboard",
          name: "首页",
          component: PageView,
          children: [
            // 二级菜单
            {
              path: "index",
              name: "后台首页",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                // 三级菜单
                {
                  path: "index",
                  name: "后台首页",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/home/index/index")
                },
                {
                  path: "detail",
                  name: "首页详情",
                  meta: {
                    invisible: true  // 不显示在左侧菜单
                  },
                  component: () => import("@/pages/home/index/detail")
                },
                {
                  path: "message",
                  name: "消息提醒",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/home/index/message")
                }
              ]
            }
          ]
        },
        // 渠道
        {
          path: "/channel",
          name: "渠道",
          component: PageView,
          children: [
            {
              path: "index",
              name: "渠道管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "list",
                  name: "渠道列表",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/list")
                },
                {
                  path: "price",
                  name: "渠道价格",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                }
              ]
            },
            {
              path: "enterprise",
              name: "企业管理",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "list",
                  name: "企业列表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/channel/enterpriseAdmin/list")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default options;
