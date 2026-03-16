# 企业微信自动回复系统(未完成, 需要真实企业)

一个基于 Node.js 的企业微信自动回复系统，支持智能回复和延迟回复功能。

## 功能特性

- **智能回复**：根据用户消息内容自动匹配回复
- **延迟回复**：支持 1-10 分钟随机延迟回复（测试环境为 10-15 秒）
- **日志记录**：完整的日志记录功能，便于调试和监控
- **正则匹配**：使用正则表达式匹配用户消息
- **定时任务**：使用 node-schedule 实现定时回复

## 项目结构

```
WeiXin-AutoReply/
├── app.js              # 主服务器文件
├── config.js           # 企业微信配置
├── logger.js           # 日志工具
├── test.js             # 测试脚本
├── package.json        # 项目依赖
├── README.md           # 项目说明
├── .gitignore          # Git 忽略文件
├── models/
│   ├── message.js      # 消息模型（MongoDB）
│   └── replies.js      # 回复规则配置
└── logs/               # 日志目录
    ├── info.log        # 信息日志
    └── error.log       # 错误日志
```

## 安装依赖

```bash
npm install
```

## 配置说明

### 1. 配置企业微信参数

编辑 `config.js` 文件，填写您的企业微信配置：

```javascript
module.exports = {
  corpId: '您的企业ID',
  appId: '您的应用ID',
  appSecret: '您的应用密钥',
  token: '您的Token',
  encodingAESKey: '您的加密密钥'
};
```

### 2. 配置回复规则

编辑 `models/replies.js` 文件，自定义回复规则：

```javascript
{
  pattern: /早上好|早啊|早安/i,
  reply: '阿婆好'
}
```

## 使用方法

### 开发环境测试

#### 1. 启动服务器

```bash
node app.js
```

服务器将在端口 3000 启动。

#### 2. 运行测试

```bash
node test.js
```

测试脚本会模拟企业微信发送消息，服务器将在 10-15 秒后自动回复。

#### 3. 查看日志

```bash
# 查看信息日志
type logs\info.log

# 查看错误日志
type logs\error.log
```

### 生产环境部署

#### 1. 配置 MongoDB 数据库

取消注释 `app.js` 中的 MongoDB 相关代码：

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WeiXin-AutoReply', { useNewUrlParser: true, useUnifiedTopology: true });
const Message = require('./models/message');
```

#### 2. 切换到生产环境延迟

取消注释 1-10 分钟延迟代码，注释 10-15 秒延迟代码：

```javascript
// 生成1-10分钟的随机延迟（生产环境使用）
const delayMinutes = Math.floor(Math.random() * 10) + 1;
const replyDate = new Date();
replyDate.setMinutes(replyDate.getMinutes() + delayMinutes);

// 生成10-15秒的随机延迟（测试环境使用）
// const delaySeconds = Math.floor(Math.random() * 5) + 10;
// const replyDate = new Date();
// replyDate.setSeconds(replyDate.getSeconds() + delaySeconds);
```

#### 3. 配置企业微信回调

在企业微信管理后台设置回调 URL：

```
http://您的服务器IP:3000/callback
```

## 日志说明

系统会自动记录以下日志：

- **服务器启动**：记录服务器启动时间
- **消息接收**：记录收到的消息内容和发送者
- **预计等待时间**：记录随机生成的延迟时间
- **消息回复**：记录回复内容和实际等待时间
- **错误信息**：记录所有错误信息

## 技术栈

- **Node.js**：运行环境
- **Express**：Web 框架
- **MongoDB**：数据库（可选）
- **Mongoose**：MongoDB 操作库
- **node-schedule**：定时任务
- **axios**：HTTP 请求
- **winston**：日志记录

## 注意事项

1. **企业微信配置**：请确保企业微信配置正确，否则无法获取 access_token
2. **服务器部署**：生产环境需要云服务器和域名
3. **数据库**：生产环境建议使用 MongoDB Atlas 云数据库
4. **日志文件**：日志文件会自动创建在 `logs` 目录下

## 常见问题

### Q: 如何添加新的回复规则？

A: 编辑 `models/replies.js` 文件，添加新的 pattern 和 reply：

```javascript
{
  pattern: /新的关键词/i,
  reply: '新的回复内容'
}
```

### Q: 如何修改延迟时间？

A: 编辑 `app.js` 文件，修改随机延迟的范围：

```javascript
// 修改这两个数字
const delaySeconds = Math.floor(Math.random() * 5) + 10; // 10-15秒
```

### Q: 日志文件在哪里？

A: 日志文件保存在 `logs` 目录下：
- `logs/info.log`：信息日志
- `logs/error.log`：错误日志

## 许可证

MIT License
