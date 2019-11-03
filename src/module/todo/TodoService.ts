import { DBConn } from '@/api/axios-http';
import TodoBean from './TodoBean'
export default class TodoService extends DBConn {
  constructor() {
    super('/t_todo')
  }

  // 在数据库中创建一条todo对象（记录）
  public createTodo(todo: TodoBean): Promise<object> {
    if (!todo['id']) {
      delete todo['id']
    }
    return super.create({ ...todo });
  }

  // 根据id删除一条数据
  public deleteSingleTodo(id: string): Promise<object> {
    return super.delete(id);
  }

  // 查询所有列表
  public selectAllTodo(): Promise<object> {
    return super.selectAll();
  }

  // 查询指定列表
  public selectTodoList(key: string, order: string, limit: number = 5): Promise<object> {
    return super.selectOrderList(key, order, limit)
  }

  // 是否标记已完成
  public markFinish(id: string, action: boolean ): Promise<object> {
    return super.update(id, { active: action })
  }

  // 编辑内容
  public editContent(id: string, content: string): Promise<object> {
    return super.update(id, { content })
  }
}
