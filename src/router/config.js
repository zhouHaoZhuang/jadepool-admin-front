import Router from "vue-router";
import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// 基础路由
export const basicRoute = [
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
  }
];
// 路由配置
export const asyncRoute = [
  {
    path: "/",
    name: "默认",
    component: TabsView,
    redirect: "/dashboard/index/home",
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
                path: "home",
                name: "后台首页",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/home/index/index")
              },
              {
                path: "message",
                name: "消息提醒",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/home/index/message")
              },
              {
                path: "detail",
                name: "查看消息详情",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true
                },
                component: () => import("@/pages/home/index/detail")
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
                path: "add",
                name: "新增渠道",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/channel/channelAdmin/addChannel")
              },
              {
                path: "detail",
                name: "渠道详情",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () => import("@/pages/channel/channelAdmin/detail")
              },
              {
                path: "price",
                name: "渠道价格",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/channel/channelAdmin/price")
              },
              {
                path: "update",
                name: "新增产品采购价格",
                meta: {
                  icon: "home",
                  invisible: true,
                  back: true
                },
                component: () => import("@/pages/channel/channelAdmin/update")
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
                component: () => import("@/pages/channel/enterpriseAdmin/list")
              },
              {
                path: "detail",
                name: "企业详情",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/channel/enterpriseAdmin/detail")
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
            path: "order",
            name: "订单管理",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "list",
                name: "订单列表",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/finance/income/order")
              },
              {
                path: "detail",
                name: "订单详情",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/finance/income/order/orderInfo.vue")
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
                component: () => import("@/pages/channel/enterpriseAdmin/list")
              },
              {
                path: "income",
                name: "收入分摊表",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/channel/enterpriseAdmin/list")
              }
            ]
          }
        ]
      },
      // 产品
      {
        path: "/business",
        name: "产品",
        component: PageView,
        children: [
          {
            path: "cloudservers",
            name: "云服务器",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "example",
                name: "实例列表",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/business/cloudservers/example/living.vue")
              },
              {
                path: "adds",
                name: "列表管理",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/business/cloudservers/example/regulate.vue")
              },
              {
                path: "renew",
                name: "续费降配列表",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/business/cloudservers/renewList.vue")
              }
            ]
          },
          {
            path: "cdn",
            name: "CDN云加速",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "domain",
                name: "域名管理",
                meta: {
                  icon: "home"
                },
                component: () => import("@/pages/product/domain.vue")
              },
              {
                path: "bill",
                name: "账单管理",
                meta: {
                  icon: "home",
                },
                component: () =>
                  import("@/pages/product/bill.vue")
              },
            ]
          }
        ]
      },
      //账号管理
      {
        path: "/personal",
        name: "个人中心",
        meta: {
          invisible: true
        },
        component: PageView,
        children: [
          {
            path: "account",
            name: "账号管理",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              // {
              //   path: "information",
              //   name: "个人信息",
              //   meta: {
              //     icon: "home"
              //   },
              //   component: () =>
              //     import("@/pages/personal/account/information.vue")
              // },
              {
                path: "password",
                name: "修改密码",
                meta: {
                  // invisible: true,
                  // back: true
                  icon: "home"
                },
                component: () => import("@/pages/personal/account/password.vue")
              }
            ]
          }
        ]
      },
      // 生产
      {
        path: "/production",
        name: "生产",
        component: PageView,
        children: [
          {
            path: "supplier",
            name: "供应商管理",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "supplierList",
                name: "供应商列表",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/production/supplier/list/list.vue")
              },
              {
                path: "add",
                name: "新建供应商",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/production/supplier/list/price.vue")
              },
              {
                path: "amend",
                name: "编辑供应商",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/production/supplier/list/amend.vue")
              },
              {
                path: "purchase",
                name: "采购账号列表",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/production/supplier/purchase/list.vue")
              },
              {
                path: "adda",
                name: "新建采购账号",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/production/supplier/purchase/price.vue")
              },
              {
                path: "amends",
                name: "编辑采购账号",
                meta: {
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/production/supplier/purchase/amend.vue")
              }
            ]
          },
          {
            path: "product",
            name: "产品管理",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "information",
                name: "产品信息管理",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/production/product/information/list.vue")
              },
              {
                path: "addproduct",
                name: "新建产品线",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true // 后退
                },
                component: () =>
                  import(
                    "@/pages/production/product/information/addproduct.vue"
                  )
              },
              {
                path: "editproduct",
                name: "编辑产品线",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true // 后退
                },
                component: () =>
                  import(
                    "@/pages/production/product/information/editproduct.vue"
                  )
              }
            ]
          },
          {
            path: "cloudServer",
            name: "云服务器",
            meta: {
              icon: "home"
            },
            component: BlankView,
            children: [
              {
                path: "orderRouting",
                name: "订单路由配置",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import("@/pages/production/cloudServer/orderRouting/list.vue")
              },
              {
                path: "newOrder",
                name: "新建订单路由规则",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true // 后退
                },
                component: () =>
                  import(
                    "@/pages/production/cloudServer/orderRouting/newOrder.vue"
                  )
              },
              {
                path: "changeOrder",
                name: "编辑订单路由规则",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true // 后退
                },
                component: () =>
                  import(
                    "@/pages/production/cloudServer/orderRouting/changeOrder.vue"
                  )
              },
              {
                path: "specification",
                name: "产品规格族配置",
                meta: {
                  icon: "home"
                },
                component: () =>
                  import(
                    "@/pages/production/cloudServer/specification/list.vue"
                  )
              },
              {
                path: "newSpecification",
                name: "新建产品规格族",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true // 后退
                },
                component: () =>
                  import(
                    "@/pages/production/cloudServer/specification/newSpecification.vue"
                  )
              }
            ]
          }
        ]
      },
      // 工单
      {
        path: "/service",
        name: "工单",
        component: PageView,
        meta: {
          perm: "userinfo"
        },
        children: [
          {
            path: "workorderManage",
            name: "工单管理",
            meta: {
              icon: "home",
              perm: "userinfo"
            },
            component: BlankView,
            children: [
              {
                path: "myWorkor",
                name: "我的工单",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/service/workorderManage/my")
              },
              {
                path: "detail",
                name: "工单信息",
                meta: {
                  perm: "userinfo",
                  invisible: true,
                  back: true
                },
                component: () =>
                  import("@/pages/service/workorderManage/detail")
              }
              // {
              //   path: "appraise",
              //   name: "工单评价",
              //   meta: {
              //     icon: "home",
              //     perm: "userinfo"
              //   },
              //   component: () =>
              //     import("@/pages/service/workorderManage/appraise")
              // }
            ]
          },
          {
            path: "setting",
            name: "工单设置",
            meta: {
              icon: "home",
              perm: "userinfo"
            },
            component: BlankView,
            children: [
              // {
              //   path: "permission",
              //   name: "工单权限设置",
              //   meta: {
              //     icon: "home",
              //     perm: "userinfo"
              //   },
              //   component: () => import("@/pages/service/setting/permission")
              // },
              {
                path: "reply",
                name: "快捷回复模板",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/service/setting/reply")
              }
            ]
          }
          // {
          //   path: "increment",
          //   name: "增值服务",
          //   meta: {
          //     icon: "home",
          //     perm: "userinfo"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "list",
          //       name: "业务列表",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/service/increment/list")
          //     },
          //     {
          //       path: "item",
          //       name: "服务项目",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/service/increment/item")
          //     },
          //     {
          //       path: "grade",
          //       name: "服务等级",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/service/increment/grade")
          //     }
          //   ]
          // },
          // {
          //   path: "serviceManage",
          //   name: "服务管理",
          //   meta: {
          //     icon: "home",
          //     perm: "userinfo"
          //   },
          //   component: BlankView,
          //   children: [
          //     {
          //       path: "push",
          //       name: "PUSH过户",
          //       meta: {
          //         icon: "home",
          //         perm: "userinfo"
          //       },
          //       component: () => import("@/pages/service/serviceManage/push")
          //     }
          //   ]
          // }
        ]
      },
      // 租户 一级菜单
      {
        path: "/tenant",
        name: "租户",
        component: PageView,
        meta: {
          perm: "userinfo"
        },
        children: [
          // 二级菜单
          {
            path: "index",
            name: "租户管理",
            meta: {
              icon: "home",
              perm: "userinfo"
            },
            component: BlankView,
            children: [
              // 三级菜单
              {
                path: "list",
                name: "租户列表",
                meta: {
                  icon: "home",
                  perm: "userinfo"
                },
                component: () => import("@/pages/tenant/admin/list")
              },
              {
                path: "detail",
                name: "租户详情",
                meta: {
                  invisible: true, // 不显示在左侧菜单
                  back: true, // 是否需要返回标题
                  perm: "userinfo"
                },
                component: () => import("@/pages/tenant/admin/detail")
              }
            ]
          }
        ]
      }
      // 系统
      // {
      //   path: "/system",
      //   name: "系统",
      //   component: PageView,
      //   children: [
      //     {
      //       path: "admin",
      //       name: "管理员",
      //       meta: {
      //         icon: "home"
      //       },
      //       component: BlankView,
      //       children: [
      //         {
      //           path: "index",
      //           name: "权限管理",
      //           meta: {
      //             icon: "home",
      //             perm: "system-admin-perm"
      //           },
      //           component: () => import("@/pages/system/admin/index")
      //         },
      //         {
      //           path: "role",
      //           name: "角色管理",
      //           meta: {
      //             icon: "home",
      //             perm: "system-admin-role"
      //           },
      //           component: () => import("@/pages/system/admin/role")
      //         },
      //         {
      //           path: "detail",
      //           name: "角色详情",
      //           meta: {
      //             invisible: true,
      //             back: true,
      //             perm: "system-admin-role"
      //           },
      //           component: () => import("@/pages/system/admin/detail")
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }
];

const options = {
  routes: [...basicRoute, ...asyncRoute]
};

// 重置之前的路由
export function resetRouter(router) {
  const newRouter = new Router({
    mode: "history",
    base: "pool",
    routes: basicRoute
  });
  router.matcher = newRouter.matcher;
}

export default options;
