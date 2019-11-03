<template>
  <div class="todo-other">
    <p>todo 0.1.0</p>
    <p>ts 3.5.3</p>
    <p>sha1 1.1.1</p>
    <p>vue 2.6.10</p>
    <p>vuex 3.0.1</p>
    <p>axios 0.19.0</p>
    <p>vue-axios 2.1.5</p>
    <p>vue-router 3.1.3</p>
    <p>stylus 0.54.7</p>
    <p>animate.css 3.7.2</p>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class TodoAll extends Vue {
  public mounted() {
    const timer = setTimeout(() => {
      TodoAll.interAnimate();
      clearTimeout(timer)
    }, 20)
  }

  private static interAnimate() {
    let pNodeList: NodeList = document.querySelectorAll('.todo-other p');
    for (let index in pNodeList) {
      let $p = pNodeList[index];
      try {
        ($p as any).setAttribute('class', 'animated slideInRight');
      }catch (e) {

      }
    }
  }
}
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>
* {
  margin: 0
  padding: 0
}

.todo-other
  width: 100%
  height: 100%
  position relative
  color rgba(255, 255, 255, 0.9)
  font-size 18px
  font-weight 500
  z-index 0
  text-align left
  background rgba(0 ,0 ,0 , 0.2)
  display flex
  flex-direction column
  justify-content center
  p
    padding 0 24px
  &::before
    content ''
    width: 100%
    height: 100%
    z-index -1
    position absolute
    top: 0
    left: 0
    background url("../../assets/other.svg") no-repeat
    background-size 100% 100%
    filter blur(2px)
.todo-other
  $p_group = 1 2 3 4 5 6 7 8 9 10
  for index in $p_group
    p:nth-child({ index })
      animation-delay index * 0.1s
</style>
