
/**
 * 时间类-->创建时间，格式化时间
 * @param date
 * @param fmt
 */
export class DateUtil {
  private date:Date;
  private fmt:string
  public constructor(date:Date, fmt:string) {
    this.date = date ? new Date(date): new Date()
    this.fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss'
  }
  public format = ():string => {
    let _date = this.date;
    let fmt = this.fmt;
    let o:any = {
      "M+" : _date.getMonth()+1,                 //月份
      "d+" : _date.getDate(),                    //日
      "h+" : _date.getHours(),                   //小时
      "m+" : _date.getMinutes(),                 //分
      "s+" : _date.getSeconds(),                 //秒
      "q+" : Math.floor((_date.getMonth()+3)/3), //季度
      "S"  : _date.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (_date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(let k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
}
