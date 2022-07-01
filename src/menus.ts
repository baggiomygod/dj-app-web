 /**
   * 菜单列表
   * key: 唯一 Key 值
   * title: 菜单标题
   * path: 菜单对应的路径
   * children:  子应用首次加载时将子应用菜单结构传给主应用
   */
const menus = [
  {
    key: "Home",
    title: "主应用",
    icon: "home",
    path: "/",
  },
  {
    key: "ApiTest",
    title: "api测试",
    icon: "login",
    path: "api-test",
  },
  {
    key: "vueApp1",
    title: "Vue1 主页",
    path: "/vue1",
    icon: "project",
    children: []
  },
  {
    key: "vueApp2",
    title: "Vue2 主页",
    path: "/vue2",
    icon: "project",
    children: []
  },
];

export default menus