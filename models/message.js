const mongoose = require('mongoose');

// 消息模型
const messageSchema = new mongoose.Schema({
  msgId: String,      // 消息ID
  content: String,    // 消息内容
  fromUser: String,   // 发送者ID
  createTime: Number, // 创建时间
  replyTime: Number   // 回复时间
});

module.exports = mongoose.model('Message', messageSchema);