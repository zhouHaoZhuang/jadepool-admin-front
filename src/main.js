import Vue from "vue";
import App from "./App.vue";
import { initRouter } from "./router";
import "./theme/index.less";
import Antd from "ant-design-vue";
import Viser from "viser-vue";
import "@/mock";
import store from "./store";
import "animate.css/source/animate.css";
import Plugins from "@/plugins";
import { initI18n } from "@/utils/i18n";
import bootstrap from "@/bootstrap";
import "moment/locale/zh-cn";
import "./global.less"; // global style
import * as Directives from "@/utils/directives/index";
import * as Filters from "@/utils/filters/index";
import * as utilsFun from "@/utils/index";
import clonedeep from 'lodash.clonedeep'
// 图片预览组件
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";

const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n("CN", "US");

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);
Vue.use(Directives);
Vue.use(Filters);
// 图片预览组件
Vue.use(preview)
// 深拷贝插件
Vue.prototype.$clonedeep = clonedeep

Vue.prototype.$getArrOnceData = utilsFun.getArrOnceData;
Vue.prototype.$getList = utilsFun.getList;
Vue.prototype.$getListQp = utilsFun.getListQp;

bootstrap({ router, store, i18n, message: Vue.prototype.$message });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
