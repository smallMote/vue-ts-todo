import Vuex from 'vuex';
import { GroupService } from '@/module/todo/Group';
import TodoService from '@/module/todo/TodoService'
import { splitArr } from '@/utils/static-tools';

const groupService = new GroupService();
const todoService = new TodoService();


export default () => {
  let listTitle: string = '';
  let allList: Array<object> = [];
  let groupList: Array<Array<object>> = [];
  return new Vuex.Store({
    state: {
      listTitle,
      allList,
      groupList
    },
    mutations: {
      selectAllGroupList(state, list: Array<Array<object>>) {
        state.groupList = list
      },
      getAllTodoList(state, { list, title }) {
        state.allList = list;
        state.listTitle = title
      }
    },
    actions: {
      async selectAllGroupListAction(context) {
        let result = await groupService.selectAllGroups();
        if (!result) return;
        context.commit('selectAllGroupList', splitArr(result['data'], 3))
      },
      async getAllTodoListAction(context) {
        let result = await todoService.selectTodoList('date', 'DESC');
        if (!result || !result['data'][0]) return;
        context.commit('getAllTodoList', { list: result['data'], title: result['data'][0].createdAt })
      }
    },
    modules: {
    },
  });
}
