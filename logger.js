const fs = require('fs');
const path = require('path');

class SimpleLogger {
  constructor() {
    this.logDir = path.join(__dirname, 'logs');
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  }

  writeLog(level, message) {
    const logFile = path.join(this.logDir, `${level}.log`);
    const formattedMessage = this.formatMessage(level, message);
    fs.appendFileSync(logFile, formattedMessage);
    console.log(formattedMessage.trim());
  }

  info(message) {
    this.writeLog('info', message);
  }

  error(message, error = null) {
    const errorMessage = error ? `${message}\n${error.stack || error}` : message;
    this.writeLog('error', errorMessage);
  }
}

module.exports = new SimpleLogger();
