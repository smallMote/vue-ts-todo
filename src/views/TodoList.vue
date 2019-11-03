<template>
  <div class="todo-list">
    <el-tag class="title">{{ title }}</el-tag>
    <el-card class="container">
      <div class="card-body">
        <div class="left">
          <NavBar/>
        </div>
        <div class="right">
          <router-view/>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '../components/todo-list/NavBar.vue'
import List from '../components/todo-list/List.vue'
@Component({
  components: {
    List,
    NavBar
  }
})
export default class TodoList extends Vue {
  readonly title: string = 'TODO LIST';

  public created() {

  }
}
</script>

<style lang="stylus">
.todo-list
  overflow hidden
  .el-card
    .el-card__body
      height: 100%
      padding: 0
</style>
<style lang="stylus" scoped>
.title
  margin-bottom: 24px
.container
  width 800px
  height 300px
  margin 0 auto
.card-body
  display flex
  height: 100%
  .left
    width 120px
    height: 100%
  .right
    width calc(100% - 120px)
    height: 100%
  background-color rgba(64, 158, 255, 0.1)
</style>
