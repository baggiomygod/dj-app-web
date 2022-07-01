import Home from "@/pages/home/index.vue";
import Login from "@/pages/login/index.vue";
import apiDj from "@/pages/test/api-dj.vue";
import notFound from "@/pages/error-pages/404.vue";
import serviceError from "@/pages/error-pages/500.vue";

const routes = [
  {
    /**
     * path: 路径为 / 时触发该路由规则
     * name: 路由的 name 为 Home
     * component: 触发路由时加载 `Home` 组件
     */
    path: "/",
    name: "Home",
    meta: { requiresAuth: false, layout: true },
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresAuth: false, layout: false },
    component: Login,
  },
  {
    path: "/api-test",
    name: "ApiTest",
    meta: { requiresAuth: false, layout: true },
    component: apiDj,
  },
  {
    path: "/404",
    name: "404",
    meta: { requiresAuth: false, layout: false },
    component: notFound,
  },
  {
    path: "/500",
    name: "500",
    meta: { requiresAuth: false, layout: false },
    component: serviceError,
  }
];


export default routes;

