const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const schedule = require('node-schedule');
// const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB连接（暂时注释，用于测试）
// mongoose.connect('mongodb://localhost:27017/WeiXin-AutoReply', { useNewUrlParser: true, useUnifiedTopology: true });

// 引入消息模型（暂时注释，用于测试）
// const Message = require('./models/message');
const replies = require('./models/replies');

// 获取access_token
let accessToken = '';

// 处理回调
app.post('/callback', (req, res) => {
  // 验证消息真实性（省略加密验证代码）
  const message = req.body;
  
  // 保存消息（暂时注释，用于测试）
  // const newMessage = new Message({
  //   msgId: message.MsgId,
  //   content: message.Content,
  //   fromUser: message.FromUserName,
  //   createTime: message.CreateTime,
  //   replyTime: 0
  // });
  // newMessage.save();
  
  // 生成回复内容
  const replyContent = replies.generateReply(message.Content);

  // 生成1-10分钟的随机延迟（生产环境使用）
  // const delayMinutes = Math.floor(Math.random() * 10) + 1;
  // const replyDate = new Date();
  // replyDate.setMinutes(replyDate.getMinutes() + delayMinutes);

  // 生成10-15秒的随机延迟（测试环境使用）
  const delaySeconds = Math.floor(Math.random() * 5) + 10;
  const replyDate = new Date();
  replyDate.setSeconds(replyDate.getSeconds() + delaySeconds);
  
  // 记录接收消息时间和预计回复时间
  const receiveTime = new Date();
  logger.info(`收到消息: "${message.Content}" 来自用户: ${message.FromUserName}`);
  logger.info(`预计等待时间: ${delaySeconds}秒，预计回复时间: ${replyDate.toISOString()}`);
  
  // 安排定时任务
  const job = schedule.scheduleJob(replyDate, async () => {
    const actualReplyTime = new Date();
    const actualDelay = Math.round((actualReplyTime - receiveTime) / 1000);
    
    try {
      await sendMessage(message.FromUserName, replyContent);
      logger.info(`已回复消息: "${replyContent}" 给用户: ${message.FromUserName}`);
      logger.info(`实际等待时间: ${actualDelay}秒，实际回复时间: ${actualReplyTime.toISOString()}`);
    } catch (error) {
      logger.error(`回复消息失败: ${error.message}`);
    }
    
    // 更新回复时间（暂时注释，用于测试）
    // Message.updateOne({ msgId: message.MsgId }, { replyTime: Math.floor(Date.now() / 1000) }).exec();
  });
  
  // 响应企业微信
  res.send('success');
});

// 发送消息
async function sendMessage(toUser, content) {
  try {
    const token = await getAccessToken();
    const url = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`;
    const data = {
      touser: toUser,
      msgtype: 'text',
      agentid: config.appId,
      text: {
        content: content
      },
      safe: 0
    };
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    logger.error('发送消息失败:', error);
    throw error;
  }
}

async function getAccessToken() {
  try {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${config.corpId}&corpsecret=${config.appSecret}`;
    const response = await axios.get(url);
    
    // 检查企业微信 API 返回的错误码
    if (response.data.errcode !== undefined && response.data.errcode !== 0) {
      throw new Error(`企业微信API错误: ${response.data.errmsg} (errcode: ${response.data.errcode})`);
    }
    
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    logger.error('获取access_token失败:', error);
    throw error;
  }
}

// 启动服务器
app.listen(3000, () => {
  logger.info('服务器已启动，监听端口3000');
});