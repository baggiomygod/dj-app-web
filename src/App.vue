<template>
  <a-config-provider prefixCls="cns">
    <router-view v-if="isNoLayout" />
    <layout v-else :menus="menus">
      <section class="cns-frame-wrapper" slot="content">
        <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
        <router-view v-show="$route.name" />

        <!-- 子应用渲染区，用于挂载子应用节点 -->
        <section v-show="!$route.name" id="frame"></section>
      </section>
    </layout>
  </a-config-provider>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Layout from "@/components/layout/index.vue";
import actions from "@/shared/actions";
import apps from '@/micro/apps'
import noLayoutRoute from '@/routes/config'
import menusConfig from './menus'
@Component({
  components: {
    Layout,
  },
})
export default class App extends Vue {
 
  menus = menusConfig
  appsName = apps.map(app => app.name)
  // Login 404 500等无菜单布局
  get isNoLayout() {
    return noLayoutRoute.names.indexOf(this.$route.name!) !== -1
  }

  @Watch("$route")
  onPathChange() {
    console.log('$route:', this.$route)
  }

  // 初始化时 根据配置有哪些子应用在globalState增加子应用的菜单key
  initGlobalStateMenu(){
    const appsMenus: any = {}
    apps.forEach((app: any) => {
      appsMenus[app.name] = app.menus
    })
    actions.setGlobalState({menus: this.menus, ...appsMenus })
  }

  // 监听主/子应用修改globalState时
  onGlobalStateMenuChange(){
    actions.onGlobalStateChange((state, prevState) => {
       // state: 变更后的状态; prevState: 变更前的状态
      console.info("主应用观察者：token 改变前的值为 ", prevState);
      console.info( "主应用观察者：登录状态发生改变，改变后的 token 的值为 ", state);
      // 设置子菜单
      this.menus.forEach((menu) => {
          // 当子应用菜单未初始化，且key值与state属性有匹配时，设置子应用菜单
          if (menu.children && !menu.children.length && menu.key in state) {
            menu.children = state[menu.key]
          }
        })
      }, true); // 第二个参数为 true，表示立即执行一次观察者函数
  }
  created() {
    this.appsName = apps.map((app) => app.name)
    this.initGlobalStateMenu()
    this.onGlobalStateMenuChange()
  }
}
</script>

<style lang="less" scoped>
#cns-main-app {
  height: 100%;
  position: relative;
}
</style>
