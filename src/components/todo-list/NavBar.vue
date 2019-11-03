<template>
  <div class="todo-list-navbar">
    <ul>
      <li>
        <router-link to="/todo-list/list">
          <i class="el-icon-menu"></i>
          <span>List</span>
        </router-link>
      </li>
      <li>
        <router-link to="/todo-list/card">
          <i class="el-icon-box"></i>
          <span>Details</span>
        </router-link>
      </li>
      <li>
        <router-link to="/todo-list/other">
          <i class="el-icon-orange"></i>
          <span>Other</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class TodoNavBar extends Vue {
}
</script>

<style lang="stylus" scoped>
*
  padding: 0
  margin: 0
a
  text-decoration none
  padding 12px
  display block
  color #333
  span
    margin-left: 6px
a.active
  color #fff
  background-color rgba(64,158,255,0.4)
li
  cursor pointer
  list-style-type none
.todo-list-navbar
  height: 100%
  position relative
  text-align left
  border-right 1px solid rgba(204, 204, 204, 0.5)
</style>
