export default class TodoBean {
  private id?: string;
  private date: Date | number;
  private group: string;
  private active: boolean;
  private content: string;
  constructor(content: string, active: boolean = false, date: Date | number, group: string = 'default', id?: string, ) {
    this.id = id;
    this.date = date;
    this.group = group;
    this.active = active;
    this.content = content
  }
}
