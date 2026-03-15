// replies.js
module.exports = {
  // 正则表达式规则
  patterns: [
    {
      pattern: /早上好|早晨|早安/i,
      reply: '阿婆早晨'
    },
    {
      pattern: /你好|嗨|哈喽/i,
      reply: '你好!'
    },
    {
      pattern: /再见|拜拜|回见/i,
      reply: '再见！'
    },
    {
      pattern: /晚上好|晚安/i,
      reply: '阿婆晚上好！'
    },
    {
      pattern: /谢谢|感谢|多谢/i,
      reply: '不客气！'
    },
        {
      pattern: /中午好|午安/i,
      reply: '阿婆中午好！'
    },
    {
      pattern: /下午好/i,
      reply: '阿婆下午好！'
    }
  ],
  
  // 生成回复的方法
  generateReply: function(userMessage) {
    // 遍历所有模式
    for (const { pattern, reply } of this.patterns) {
      if (pattern.test(userMessage)) {
        return reply;
      }
    }
    
    // 没有匹配到任何模式，返回 null
    return null;
  }
};