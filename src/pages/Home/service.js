import request from '../../utils/request'

export const sendMessageChatGPT = (params) => {
  return request('/axios-server-ChatGPT', {
    method: 'GET',
    body: { ...params },
  }).then(res => {
    console.log(res);
    if (res.status === 200) {
      return res.data
    }
    else {
      console.log('请求出错');
      return res.data
    }
  })
}