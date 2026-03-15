const axios = require('axios');

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testCallback() {
  try {
    const testData = {
      MsgId: 'test_' + Date.now(),
      Content: '早上好',
      FromUserName: 'test_user',
      CreateTime: Math.floor(Date.now() / 1000),
      MsgType: 'text'  // 添加消息类型
    };

    console.log('发送测试消息:', testData.Content);
    console.log('等待服务器处理...\n');
    
    const response = await axios.post('http://localhost:3000/callback', testData);
    
    console.log('服务器响应:', response.data);
    console.log('消息已接收，等待自动回复（约10-15秒）...\n');
    
    // 等待15秒，让服务器完成回复
    await delay(15000);
    
    console.log('测试完成！请检查服务器日志确认回复结果。');
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

console.log('开始测试...\n');
testCallback();
