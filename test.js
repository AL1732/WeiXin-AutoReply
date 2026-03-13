const axios = require('axios');

async function testCallback() {
  try {
    const testData = {
      MsgId: 'test_' + Date.now(),
      Content: '早上好',
      FromUserName: 'test_user',
      CreateTime: Math.floor(Date.now() / 1000)
    };

    console.log('发送测试消息:', testData.Content);
    
    const response = await axios.post('http://localhost:3000/callback', testData);
    
    console.log('服务器响应:', response.data);
    console.log('测试成功！请在服务器窗口查看回复结果。');
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

console.log('开始测试...\n');
testCallback();
