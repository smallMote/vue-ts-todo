<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view/>
    <hello-world msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import TodoList from './views/TodoList.vue'

@Component({
  components: {
    TodoList,
    HelloWorld
  },
})
export default class App extends Vue {

  // 初始化App
  public mounted() {
    this.$store.dispatch('getAllTodoListAction');
    this.$store.dispatch('selectAllGroupListAction')
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 12px
</style>
