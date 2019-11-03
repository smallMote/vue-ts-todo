<template>
  <div class="demo">
    <el-tag> {{ message }}</el-tag>
    <el-card class="demo-card">
      <el-button @click="handleClick()">Click Me</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
@Component
export default class Demo extends Vue {
  message: string = 'Hello Typescript'
  handleClick() {
    this.$message.success('You clicked the button!')
  }
}
</script>

<style lang="stylus" scoped>
.demo-card
  max-width 450px
  margin 0 auto
  margin-top: 24px
</style>
