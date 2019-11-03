import Vue from 'vue'

const bus = new Vue()

export class VueBus {
  constructor(
    private app: Vue
  ) {
    this.listenEvent()
  }
  
  private listenEvent() {
    bus.$on('netError', code => this.netErrorService(code))
  }
  
  private netErrorService({ statusCode }) {
    let message: string = '';
    switch (statusCode) {
      case 200:
        message = '请求成功！';break;
      case 404:
        message = '资源未找到！';break;
      case 503:
        message = '服务器内部错误';break
    }
    if (statusCode === 200) return;
    this.app.$message.error(message)
  }
}
export default bus
