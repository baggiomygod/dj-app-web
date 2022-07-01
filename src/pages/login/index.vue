<template>
  <section class="login-container">
    {{ token }}
    <a-button size="large" type="primary" @click="login">Login share</a-button>
    <a-button size="large" type="primary" @click="loginGql">Login Gql</a-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
/* eslint-disable */
import VueRouter from "vue-router";
import actions from "@/shared/actions";

import SignIn from "@/apis/graphql-api/signIn.gql";
import { State, namespace } from "vuex-class";
import { onLogin } from "@/vue-apollo";
const someModule = namespace("app");
@Component
export default class Login extends Vue {
  $router!: VueRouter;
  $apollo!: any;
  @State((state) => state.app.token) token!: string;
  @someModule.Action("setTokenAction") setTokenAction!: (t: string) => any;

  created() {}
  mounted() {
    
  }
  async apollpLogin() {
    const res: any = await this.$apollo.mutate({
      mutation: SignIn,
      variables: {
        login: "admin",
        password: "12345678",
      },
    });
    const token = res.data.signIn.token;
    return token;
  }

  // restful api 接口测试
  async login() {
    const token = await this.apollpLogin();
    // 使用 shared 的 setToken 记录 token
    // await this.setTokenAction(token);
    // actions.setGlobalState({ token });
    this.$router.push("/");
  }

  // graphql 接口测试
  async loginGql() {
    const token = await this.apollpLogin();
    await this.setTokenAction(token);
    onLogin(this.$apollo, token);

    // 登录成功后，设置 token
    actions.setGlobalState({ token });
    this.$router.push("/");
  }

  @Watch("token")
  onToken(newVal: string) {
    console.log(newVal);
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/styles/flex.less";

.login-container {
  padding: 30px;
}
</style>

function Action(arg0: string) {
  throw new Error("Function not implemented.");
}
