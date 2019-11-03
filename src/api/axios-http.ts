import Axios from 'axios'
import Sha1 from 'sha1'
import bus from '@/utils/bus'

interface ConfigInterface {
  baseHost?: string
  appId?: string
  addKey?: string
}

interface RequestInterface {
  baseURL?: string
  headers?: object
  get?: any
  post?: any
}

const NOW: string = Date.now().toString();

const config: ConfigInterface = {
  baseHost: 'https://d.apicloud.com/mcm/api',
  appId: '你的App id',
  addKey: '你的App key'
};

// 设置连接数据库的axios
const request: object = Axios.create({
  baseURL: config.baseHost,
  timeout: 3000,
  headers: {
    'X-APICloud-AppId': config.appId,
    'X-APICloud-AppKey': `${Sha1(`${config.appId}UZ${config.addKey}UZ${NOW}`)}.${NOW}`,
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
});

// 创建对象
export class DBConn {
  private url: string | undefined;
  private config: ConfigInterface;
  private request: RequestInterface;
  
  constructor(url?: string) {
    this.url = url;
    this.request = request;
    this.config = {
      baseHost: 'https://d.apicloud.com/mcm/api',
      appId: 'A6025488616288',
      addKey: '66F96C1B-95B9-4ACD-6D40-DB4A85F0523A'
    }
  }
  // 创建一条记录
  protected async create(data: object): Promise<object> {
    return await this.post(data)
  }
  // 删除一条记录
  protected async delete(id?: string): Promise<object> {
    return await this.post({'_method': 'DELETE'}, `/${id}`)
  }
  // 更新一条记录
  protected async update(id: string, data: object): Promise<object> {
    return await this.post({ ...data, _method: 'PUT' }, `/${id}`)
  }
  // 查询全表
  protected async selectAll(): Promise<object> {
    return await this.get()
  }
  // 根据id查询一条记录
  protected async selectOne(id: string | number): Promise<object> {
    return await this.get( { id })
  }

  /**
   * 列表查询+排序
   * @param key 按key字段排序
   * @param order 排序方式 ASC | DESC -> 正序 | 倒序
   * @param limit
   */
  protected async selectOrderList(key: string, order: string = 'ASC', limit: number = 5): Promise<object> {
    return await this.get({ filter: { order: `${key} ${order}`, limit } })
  }

  // POST
  private async post(data?: object, url?: string): Promise<object> {
    url = url ? url : '';
    const $R: RequestInterface = this.request;
    let response: object | undefined | null = null;
    const result = await $R.post(this.url+''+url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch( error => {
      const err = error.response.data.error;
      bus.$emit('netError', err);
      response = { code: err.statusCode, message: err.message }
    });
    return Promise.resolve({
      data: result ? { ...result.data, code: 200 } : response
    })
  }

  // GET
  private async get( data?: object | string | undefined): Promise<object> {
    const $R: RequestInterface = this.request;
    const result = await $R.get(this.url, { params: data }).catch( error => {
      bus.$emit('netError', error.response.data.error)
    });
    return Promise.resolve({ data: result.data, code: result.code })
  }
}
