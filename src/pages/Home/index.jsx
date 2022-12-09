import React, { useState, useEffect } from "react";
import { Button, Input, message } from 'antd';
import { sendMessageChatGPT } from './service'
import './index.less';
import { data } from "browserslist";

const { Search } = Input;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [questionValue, setQuestionValue] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 发送问题
   * @param {*} value 
   */
  const areSendMessageChatGPT = async (value) => {
    if (value === '') return;
    console.log(value);
    let tempArr = [{ type: 'user', value: value }]
    setMessageList([...messageList, { type: 'user', value: value }])
    setQuestionValue('')
    setIsLoading(true);
    messageApi.open({
      type: 'loading',
      content: '问答系统正在努力基于ChatGPT筹备回答中，请耐心等待20s左右>_<.......',
      duration: 20,
    });
    let data = await sendMessageChatGPT({ issue: value })
    console.log('data-->', data);
    messageApi.destroy()
    if (data && data.answer) {
      messageApi.open({
        type: 'success',
        content: '结果返回成功',
      });
    }
    else {
      messageApi.open({
        type: 'success',
        content: '结果返回失败，请重试',
      });
    }
    tempArr.push({ type: 'robot', value: data.answer })
    setMessageList([...messageList, ...tempArr]) // 因为setMessageList是异步，而这边是同步代码，会覆盖。
    setIsLoading(false)
  };


  useEffect(() => {
    console.log(messageList);
  }, [messageList])

  return (
    <div className="home-page">
      <div className="github-code" onClick={()=>{window.open('https://github.com/JACK-ZHANG-coming/ChatGPT-bot-pc')}}>
        <img width='100%' src={require('../../assets/imgs/github-logo.jpeg')} alt="项目github源码" title="项目github源码"/>
      </div>
      {contextHolder}
      <h2 style={{marginTop:'20px'}}>基于ChatGPT的问答系统简单实现</h2>
      <div className="content-box">
        <div className="content-box-water">
          {
            messageList.map((item, index) => {
              if (item.type === 'user') {
                return <div className="user-robot" key={index}>
                  <div className="icon">You</div>
                  <div className="content">{item.value}</div>
                </div>
              }
              else {
                return <div className="user-robot" key={index}>
                  <div className="icon icon-robot">ChatGPT</div>
                  <div className="content">{item.value}</div>
                </div>
              }
            })
          }
        </div>
        <div className="content-box-bottom">到底了~</div>
      </div>
      <div className="input-box">
        {/* <Button type='primary' onClick={() => { areSendMessageChatGPT({ issue: '1231231111' }) }}>发送</Button> */}
        <Search placeholder="在这里输入你想问的问题~" value={questionValue} onChange={(e) => setQuestionValue(e.target.value)} enterButton={isLoading ? '请求中' : '发送'} size="large" loading={isLoading} onSearch={areSendMessageChatGPT} />
      </div>
    </div>
  )
};

export default Home