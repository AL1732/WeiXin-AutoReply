// replies.js
module.exports = {
  // 正则表达式规则
  patterns: [
    {
      pattern: /早上好|早啊|早安/i,
      reply: '阿婆好'
    },
    {
      pattern: /你好|嗨|哈喽/i,
      reply: '你好!'
    },
    {
      pattern: /再见|拜拜|回见/i,
      reply: '阿婆再见！'
    },
    {
      pattern: /天气|气温/i,
      reply: '抱歉，我暂时无法查询天气信息。'
    },
    {
      pattern: /谢谢|感谢|多谢/i,
      reply: '不客气！'
    },
    {
      pattern: /帮助|帮忙/i,
      reply: '怎么了？'
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
    
    // 没有匹配到任何模式
    return '什么?';
  }
};