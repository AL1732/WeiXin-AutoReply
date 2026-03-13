const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

async function testGetToken() {
  console.log('=== 调试测试 ===');
  console.log('corpId:', config.corpId);
  console.log('appSecret:', config.appSecret ? '已设置' : '未设置');
  
  try {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${config.corpId}&corpsecret=${config.appSecret}`;
    console.log('请求URL:', url);
    
    const response = await axios.get(url);
    console.log('响应:', response.data);
    
    if (response.data.access_token) {
      console.log('成功获取 access_token');
    } else {
      console.log('未获取到 access_token:', response.data);
    }
  } catch (error) {
    console.log('请求失败:', error.message);
    if (error.response) {
      console.log('错误响应:', error.response.data);
      console.log('状态码:', error.response.status);
    }
    
    // 测试 logger.error 是否正常工作
    console.log('\n测试 logger.error...');
    logger.error('测试错误信息', error);
    console.log('logger.error 调用完成');
  }
}

testGetToken();
