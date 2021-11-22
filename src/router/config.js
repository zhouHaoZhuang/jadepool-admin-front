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
                    invisible: true // 不显示在左侧菜单
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
        },
        // 财务
        {
          path: "/finance",
          name: "财务",
          component: PageView,
          children: [
            {
              path: "index",
              name: "收支账簿",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "order",
                  name: "订单管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/list")
                },
                {
                  path: "detailed",
                  name: "财务明细",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "recharge",
                  name: "充值记录",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                }
              ]
            },
            {
              path: "examine",
              name: "财务审核",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "payment",
                  name: "人工入款",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/list")
                },
                {
                  path: "remittance",
                  name: "线下汇款",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "invoice",
                  name: "发票管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "contract",
                  name: "合同管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/list")
                },
                {
                  path: "withdrawal",
                  name: "提现管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                },
                {
                  path: "refund",
                  name: "退款管理",
                  meta: {
                    icon: "home"
                  },
                  component: () => import("@/pages/channel/channelAdmin/price")
                }
              ]
            },
            {
              path: "report",
              name: "财务报表",
              meta: {
                icon: "home"
              },
              component: BlankView,
              children: [
                {
                  path: "reconciliation",
                  name: "渠道对账表",
                  meta: {
                    icon: "home"
                  },
                  component: () =>
                    import("@/pages/channel/enterpriseAdmin/list")
                },
                {
                  path: "income",
                  name: "收入分摊表",
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
