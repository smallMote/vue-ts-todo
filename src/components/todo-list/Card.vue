<template>
  <div class="todo-card">
    <div
      v-if="!showEdit"
      class="card-group">
      <el-row
          v-for="(cardRow, row_index) in groupList"
          :key="`row_${row_index}`"
        :gutter="3"
        class="todo-row">
        <el-col
          v-for="(cardCol, col_index) in cardRow"
          :key="`col_${col_index}`"
          :span="8"
          class="todo-col animated fadeIn">
          <el-card>
            <div slot="header">
              {{ cardCol.name }}
            </div>
            <section :class="['card-body', { action: cardCol.id }, { 'none-data': !cardCol.id}]">
              <el-button
                v-if="cardCol.content === ''"
                @click="opecEditCard(cardCol, row_index, col_index)"
                type="primary"
                size="mini">Add</el-button>
              {{ cardCol.content }}
              <div
                v-show="cardCol.id"
                class="action-plane">
                <span
                  @click="opecEditCard(cardCol)"
                  title="编辑">
                  <i class="el-icon-edit"></i>
                </span>
                <span
                  @click="deleteGroup(cardCol.id)"
                  title="删除">
                  <i class="el-icon-delete"></i>
                </span>
              </div>
            </section>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <EditCard
      v-if="showEdit"
      @back="showEdit = false"
      @refresh="refreshCardList()"
      :position="position"
      :group="group"/>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import EditCard from './EditCard.vue'
  import { GroupService } from "@/module/todo/Group";
  const groupService = new GroupService();

  @Component({
    components: {
      EditCard
    }
  })

  export default class Card extends Vue {
    showEdit: boolean;
    cardList: Array<Array<object>>;
    position: number;
    group: object;
    constructor(){
      super();
      this.position = 0;
      this.showEdit = false;
      this.group = { name: '', content: ''};
      this.cardList = []
    }

    get groupList() {
      const DEF_TITLE = 'Are you ready?';
      let list: Array<Array<Object>> = this.$store.state.groupList;
      if (!list.length) {
        list[0] = [];
        list[0].push({ name: DEF_TITLE, content: '' })
      } else {
        for (let i: number = 0; i < list.length; i++) {
          if (list[i].length < 3 && list[i].length >= 1 && list[i][list[i].length - 1]['content'] !== '') {
            list[i].push({ name: DEF_TITLE, content: '' });
          }
        }
      }
      if (list.length === 1 && list[0].length === 3) {
        list.push([{ name: DEF_TITLE, content: '' }])
      }
      return list
    }

    // 打开编辑页面
    opecEditCard(group: object, rowIndex: number, colIndex: number) {
      this.group = group;
      rowIndex = rowIndex + 1;
      this.position = rowIndex * colIndex;
      this.showEdit = true;
    }

    // 刷新数据
    public refreshCardList() {
      this.$store.dispatch('selectAllGroupListAction');
    }
    // 删除
    async deleteGroup(id: string) {
      let result = await groupService.deleteSingleGroup(id);
      if (!result) return;
      console.log(result);
      this.refreshCardList()
    }
  }

</script>

<style lang="stylus">
.todo-card
  .el-card
    .el-card__header
      padding 6px 0
    .el-card__body
      position relative
      height calc(100% - 34px)
      overflow hidden
</style>
<style lang="stylus" scoped>
.todo-card
  padding 12px
  height calc(100% - 24px)
  display flex
  flex-direction column
  justify-content space-between
  .card-group
    height: 100%
    display flex
    flex-direction column
    justify-content space-between
  .el-card
    box-shadow none
    height: 100%
    .el-card__header
      padding 0
    .card-body
      margin 6px 12px
      margin-top: 0
      padding-top: 6px
      overflow hidden
      height calc(100% - 12px)
      text-align left
      img
        width 100%
    .card-body.none-data
      display flex
      align-items center
      flex-direction column
      justify-content center
    .card-body.action
      // position relative
      z-index 0
      &:hover
        .action-plane
          border-radius 3px
          bottom: 0
      .action-plane
        width: 100%
        height: 100%
        position absolute
        z-index 1
        bottom: -100%
        // bottom: 0
        left: 0
        overflow hidden
        transition 0.8s ease
        border-radius 50% 50%
        display flex
        align-items center
        justify-content space-around
        background rgba(64, 158, 256, 0.1)
        span
          $size = 36px
          width: $size
          height: $size
          cursor pointer
          border-radius 50%
          display block
          font-size 12px
          line-height $size
          text-align center
          color #ffffff
          transform-origin center
          background rgba(64, 158, 256, 0.8)
          &:last-child
            background rgba(245, 108, 108, 0.8)
          &:hover
            animation ActionScale 0.8s infinite
  .todo-row
    height calc(50% - 3px)
    .el-col
      height: 100%
  .todo-row:nth-child(1)
    for $i in 1 2 3
      .el-col:nth-child({ $i })
        animation-delay $i * 0.1s
  .todo-row:nth-child(2)
    $count = 0
    for $i in 0.4s 0.5s 0.6s
      $count = $count + 1
      .el-col:nth-child({$count })
        animation-delay $i

  @keyframes ActionScale {
    0% {
      transform scale(1)
    }
    50% {
      transform scale(1.2)
      opacity 0.8
    }
    100% {
      transform scale(1)
    }
  }
</style>
