import { DBConn } from '@/api/axios-http'
export class GroupBean {
  private name: string;
  private content: string;
  constructor(name: string, content: string) {
    this.name = name;
    this.content = content
  }
}

export class GroupService extends DBConn {
  constructor() {
    super('/t_group')
  }

  public createGroup(group: GroupBean): Promise<object> {
    return super.create({ ...group })
  }

  public deleteSingleGroup(id: string): Promise<object> {
    return super.delete(id)
  }

  public editGroup(id: string, data: object): Promise<object> {
    return super.update(id, data)
  }

  public selectAllGroups(): Promise<object> {
    return super.selectAll();
  }

  public selectOrderList(key: string, order: string = 'ASC', limit: number = 6): Promise<object> {
    return super.selectOrderList(key, order, limit);
  }
}
