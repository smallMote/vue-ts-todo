<template>
  <div
    :style="editPosition"
    :class="['edit-card animated fadeIn', { 'init': !showFull }]">
    <el-card class="edit-card-view">
      <div slot="header" class="title-container">
        <label for="title-input"></label>
        <input
          placeholder="Group name"
          id="title-input"
          v-model="card.name"/>
        <el-button
          size="mini"
          @click="back()">
          Cancel
        </el-button>
      </div>
      <div class="card-body">
        <textarea
          id="content-input"
          v-model="card.content"
          placeholder="You can write introductions about you ......"></textarea>
        <label for="content-input"></label>
        <el-button
          class="save-btn"
          type="primary"
          size="mini"
          @click="save()">
          <el-icon v-if="loading" name="loading"/>
          <span v-else>Save</span>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { GroupBean, GroupService } from "@/module/todo/Group"
  const groupService = new GroupService();
  @Component
  export default class EditCard extends Vue {
    private card: object;
    private showFull: boolean;
    private loading: boolean;
    private editPosition: object | undefined | null;
    constructor() {
      super();
      this.showFull = false;
      this.loading = false;
      this.editPosition = {};
      this.card = {
        name: '',
        content: ''
      }
    }
    // 根据传递进来的位置显示
    @Prop({
      type: Number,
      default: 0
    })
    position !: number;

    // 根据传递进来的位置显示
    @Prop({
      type: Object,
      default: () => {}
    })
    group !: object;

    public created() {
      this.card = this.group
    }

    public mounted() {
      const timer = setTimeout(() => {
        this.showFull = true;
        clearTimeout(timer)
      }, 20)
    }

    get validate(): boolean {
      let name: string = this.card['name'].trim();
      let content: string = this.card['content'].trim();
      return name !== '' && content !== ''
    }
    // 返回
    protected back() {
      this.$emit('back')
    }

    // 保存
    public save() {
      if (this.group['id']) {
        this.editGroup()
      } else {
        this.addGroup()
      }
    }

    // 添加
    protected async addGroup() {
      if (!this.validate) return;
      this.loading = true;
      let group: GroupBean = new GroupBean(this.card['name'], this.card['content']);
      let result = await groupService.createGroup(group);
      this.loading = false;
      if (!result) return;
      this.$emit('refresh'); // 刷新
      this.back()
    }

    // 更新
    protected async editGroup() {
      if (!this.validate && this.group['id']) return;
      let id: string = this.group['id'];
      let name: string = this.card['name'];
      let content: string = this.card['content'];
      let result = await groupService.editGroup(id,{ name, content });
      if (!result) return;
      this.$emit('refresh'); // 刷新
      this.back()
    }
  }
</script>

<style lang="stylus">
.edit-card
  .el-card
    .el-card__header
      padding: 0 12px
    .el-card__body
      height calc(100% - 45px)
</style>

<style lang="stylus" scoped>
.edit-card
  position relative
  height: 100%
  width: 100%
  transition 0.8s ease

// 初始化的时候
.init.edit-card
  width 33.33%
  height 50%
label {
  display none
}
.title-container
  display flex
  align-items center
  .el-button
    margin-right: 12px
#title-input {
  width: calc(100%)
  line-height 30px
  font-size 18px
  outline none
  border none
  color #333333
  margin: 0 12px
}
.el-card
  box-shadow none
  height: 100%
  .el-card__header
    padding 0
  .card-body
    overflow hidden
    min-height calc(100%)
    position relative
    .save-btn
      position absolute
      bottom: 24px
      right: 12px
      opacity 0.2
      transition 0.4s ease
      &:hover
        opacity 1
    #content-input
      width: calc(100% - 24px)
      min-height: calc(230px - 24px)
      border none
      outline none
      padding 12px 0
      color rgba(17, 51, 83, 0.6)
      font-size 16px
      letter-spacing 1px
      &::-webkit-scrollbar
        width 2px
        background-color transparent
        border-radius 6px
      &::-webkit-scrollbar-thumb
        background rgba(64, 158, 255, 0.3)
        border-radius 6px
</style>
