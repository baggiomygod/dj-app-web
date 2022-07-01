<template>
  <a-layout id="components-layout-main-custom-trigger" class="layout-container">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" /> 
      <a-menu mode="inline" theme="dark" :selectedKeys="[selectKey]" class="menu-wrap">
        <a-sub-menu v-for="item in menus" :key="item.key">
           <span slot="title" class="custon-group-title"><a-icon :type="item.icon" />
            <router-link :to="item.path" class="base-link-text">{{item.title}}</router-link>
           </span>
          <a-menu-item v-if="!item.children" 
            @click="changeMenu(item)"
          >
            <router-link :to="{ path: item.path }">
              <a-icon v-if="item.icon" :type="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
          <!-- 子应用 -->
          <a-menu-item-group v-else v-for="(citem) in item.children" 
              :key="citem.key">
                  <a-menu-item v-if="!citem.children" >
                    <router-link :to="`${item.path}${citem.path}`">{{citem.title}}</router-link>
                  </a-menu-item>
                  
                  <span slot="title" class="custon-group-title" v-else>
                    <a-icon :type="citem.icon" />
                    <span>{{citem.title}}</span>
                    </span>
                  <a-menu-item 
                    v-for="(subItem) in citem.children" 
                    :key="subItem.key"
                    >
                    <router-link :to="`${item.path}${subItem.path}`">{{subItem.title}}</router-link>
                  </a-menu-item>
              </a-menu-item-group>
      </a-sub-menu >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header-content">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="header-login">
            <div class="user-name">test</div>
            <a-dropdown v-if="token">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <a-avatar v-if="token" :size="55" icon="user" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <router-link :to="{ path: '/login' }">
                    <span>退出</span>
                  </router-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-button v-else type="primary">
              <router-link :to="{ path: '/login' }">
                <span>登录</span>
              </router-link>
            </a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <slot name="content"></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const someModule = namespace("app");

type MenuItem = {
  key: string;
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
};

@Component
export default class Menu extends Vue {
  @Prop({ type: Array, default: [] })
  menus!: MenuItem[];

  collapsed: boolean = false;

  @someModule.State("token") token!: string;
  @Watch("$route.path")
  onPathChange() {
    this._initMenus();
  }
  
  @Watch("menus")
    onMenusChange() {
      console.log('总菜单：', this.menus)
    }

  selectKey: string = "";

  created() {
    this._initMenus();
  }

  private _initMenus() {
    const currentMenu = this._findCurrentMenu(
      this.menus,
      this.$route.path
    ) as MenuItem;
    if (!currentMenu) return;
    const { key } = currentMenu;
    this.selectKey = key;
  }

  private _findCurrentMenu(
    menus: MenuItem[],
    currentPath: string
  ): MenuItem | null {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      const { path } = menu;
      if (path === currentPath) return menu;

      const currentMenu = this._findCurrentMenu(
        menu.children || [],
        currentPath
      );
      if (currentMenu) return currentMenu;
    }
    return null;
  }

  /**
   * 切换菜单
   */
  changeMenu(item: MenuItem) {
    const { key } = item;
    this.selectKey = key;
  }
}
</script>

<style lang="less" scoped>
#components-layout-main-custom-trigger {
  height: 100%;
}
#components-layout-main-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-main-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-main-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header-content {
  display: flex;
  justify-content: space-between;
  .header-login {
    align-items: center;
    justify-content: space-around;
    width: 20%;
    display: flex;
  }
}

.layout-container{
  .menu-wrap{
    .base-link-text{
      text-decoration: none;
      color:#fff;
    }
    // .menus-main{
      /deep/.cns-menu-item-group-title{
        background: rgba(255, 255, 255, 0.1);
      }
    // }
     
  }
  
}
</style>