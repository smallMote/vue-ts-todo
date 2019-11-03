<template>
  <div class="list animated fadeIn">
    <div class="title">
      <span>{{ title | filterDate }}</span>
      <div class="action">
        <el-tag
          @click="category = 'all'"
          :type="category === 'all' ? 'default' : 'info'"
        >
          All
        </el-tag>
        <el-tag
          @click="category = 'accomplish'"
          :type="category === 'accomplish' ? 'success' : 'info'"
        >
          Accomplish
        </el-tag>
        <el-tag
          @click="category = 'undone'"
          :type="category === 'undone' ? 'danger' : 'info'"
        >
          Undone
        </el-tag>
      </div>
    </div>
    <div class="group view">
      <div
        v-for="(item, index) in todoList"
        :key="item.id"
        :class="['list-item animated slideInRight', { active: item.active }]">
        <span
          @click="selectedListItem(item.id, item.active, index)"
          class="right-box">
          <i class="el-icon-check"></i>
        </span>
        <span
          @click="selectedEditTodo(item)"
          class="content">{{ item.content }}</span>
        <span
          @click="deleteSingle(item.id)"
          class="left-box">
          <i class="el-icon-error"></i>
        </span>
      </div>
    </div>
    <div class="group add-list">
      <div class="list-item">
        <span
          v-if="showRefresh"
          @click="addListValue()"
          class="right-box">
          <i :class="['el-icon-refresh', { active: refreshing }]"></i>
        </span>
        <span
          v-else
          @click="addListValue()"
          class="right-box">
          <i class="el-icon-plus"></i>
        </span>
        <label>
          <input
            @keydown.enter="addListValue()"
            v-model="listValue"/>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TodoBean from '@/module/todo/TodoBean'
import TodoService from '@/module/todo/TodoService'
import { createRandomStr } from "@/utils/static-tools";
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component // error => TypeError: Cannot read property 'extend' of undefined
export default class ListItem extends Vue {
  id: string;
  category: string;
  listValue: string;
  listData: Array<object>;
  todoService: TodoService;
  showRefresh: boolean;
  refreshing: boolean;
  constructor() {
    super();
    this.id = ''; // todo 的 id
    this.category = 'all';
    this.listValue = '';
    this.listData = [{ id: createRandomStr(), content: 'example'}];
    this.showRefresh = false;
    this.refreshing = false;
    this.todoService = new TodoService()
  }

  // 计算todoList
  get todoList(): Array<object> {
    let list = this.$store.state.allList;
    if (this.category === 'all') {
      return list
    } else {
      return this.category === 'accomplish' ? list.filter(item => item['active']) : list.filter(item => !item['active'])
    }
  }

  get title(): string {
    return this.$store.state.listTitle
  }
  // 删除一条todo
  public async deleteSingle(id: string) {
    let result = await this.todoService.deleteSingleTodo(id);
    if (!result) return;
    this.selectTodoOrderList()
  }

  // 查询todo列表
  public async selectTodoOrderList() {
    this.$store.dispatch('getAllTodoListAction')
  }

  // 提交数据库
  async addListValue() {
    if(!this.listValue) return;
    if (this.id) {
      // 编辑
      this.refreshing = true;
      let result = await this.todoService.editContent(this.id, this.listValue);
      if (!result) return;
      await this.selectTodoOrderList();
      this.refreshing = false;
      this.showRefresh = false
    } else {
      // 添加
      let todo = new TodoBean(this.listValue, false, new Date().getTime(), 'default');
      let result = await this.todoService.createTodo(todo);
      if (!result) return;
      this.selectTodoOrderList()
    }
    this.listValue = '';
  }

  // 标记是否完成
  async selectedListItem(id: string, action: boolean, index: number) {
    let result: object = await this.todoService.markFinish(id, !action);
    if (!result) return;
    this.selectTodoOrderList()
  }

  // 点击选中要编辑的todo
  selectedEditTodo(todo: object) {
    this.id = todo['id'];
    this.listValue = todo['content'];
    this.showRefresh = true
  }
}
</script>

<style lang="stylus" scoped>
.list
  height: 100%
.title
  height 48px
  text-align left
  margin-left 24px
  margin-right 24px
  line-height 48px
  display flex
  align-items center
  justify-content space-between
  .action
    display flex
    .el-tag
      cursor pointer
      height: 24px
      margin-left: 24px
      line-height 24px
.group
  padding: 24px
  padding-top: 0
  overflow-y: scroll
  overflow-x hidden
  height calc(100% - 150px)
  &::-webkit-scrollbar
    width: 2px
    background-color transparent
    border-radius 6px
  &::-webkit-scrollbar-thumb
    background rgba(64, 158, 255, 0.2)
    border-radius 6px
.group.view
  for index in 1 2 3
    .list-item:nth-child({ index })
      animation-delay index * 0.1s
.add-list
  height unset
  padding-top: 12px
  .list-item
    background-color rgba(64, 158, 255, 0.4)
    color #fff
    .right-box
      border-color #fff
      color #fff
      &:hover
        border-color #fff
        color #fff
      .active.el-icon-refresh
        animation Refresh 3s infinite ease
    label
      width: calc(100% - 76px)
    input
      width: 100%
      border none
      outline none
      height 48px
      line-height 48px
      font-size 18px
      background none
      color #fff
 @keyframes Refresh {
   0% {
     transform rotate(0deg)
   }
   100% {
     transform rotate(360deg)
   }
 }
.list-item
  $size = 48px
  width: 100%
  height $size
  box-shadow 0 0 5px rgba(204, 204, 204, 0.5)
  border-radius 6px
  background-color #fff
  display flex
  align-items center
  margin-bottom: 12px
  position relative
  span.content
    width calc(100% - 16px - 24px - 26px - 12px)
    text-align left
  .right-box
    height 24px
    width: 24px
    display inline-block
    border 1px solid #ccc
    border-radius 50%
    margin-left: 12px
    margin-right: 12px
    line-height 24px
    text-align center
    color #ccc
    cursor pointer
    &:hover
      border-color rgba(64, 158, 255, 0.5)
      color rgba(64, 158, 255, 0.5)

  .left-box
    color #F56C6C
    position absolute
    right: 12px
    i
      cursor pointer
.list-item.active
  text-decoration line-through
  .right-box
    border-color rgba(64, 158, 255, 1)
    color rgba(64, 158, 255, 1)
</style>
