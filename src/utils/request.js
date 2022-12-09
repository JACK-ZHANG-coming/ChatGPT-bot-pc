import axios from 'axios';
import { message, notification } from 'antd';


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或编辑数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或编辑数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errorText,
  });
  const error = new Error(errorText);
  error.name = response.status;
  error.message = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 */
export default function request(url, params) {
  console.log(params);
  //配置 baseURL
  axios.defaults.baseURL = 'http://chatgptnodejs.zhangqiang.hk.cn:80';
  // axios.defaults.baseURL = 'chatgptnodejs.zhangqiang.hk.cn:80';
  return axios.get(url, {
    //url 参数
    params: {
      ...params.body
    },
    //请求头信息
    headers: {
      // name: 'atguigu',
      // age: 20
    }
  })
}
