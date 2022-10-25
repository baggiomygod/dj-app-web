import Vue from "vue";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import startQiankun from "./micro";
import "./assets/styles/locale.antd.css";
import "./assets/styles/global.css";
import store from './store'
Vue.use(VueRouter);
Vue.use(Antd);

Vue.config.productionTip = false;

import { createProvider } from './vue-apollo'

startQiankun();

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App)
}).$mount("#main-app");
