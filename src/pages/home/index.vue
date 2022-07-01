<template>
  <div>
    <section class="home-container">Home</section>
    <a-button size="large" type="primary" @click="getTodos">todos</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GET_TODOS from "@/apis/graphql-api/todos.gql";
import actions from "@/shared/actions";
@Component
export default class Home extends Vue {
  $apollo!: any;

  async getTodos() {
    const { data } = await this.$apollo.query({ query: GET_TODOS });
    actions.setGlobalState({ todos: data.todos });
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 30px;
}
</style>
