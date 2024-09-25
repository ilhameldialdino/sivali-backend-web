const winston = require('winston'); // You can install winston for logging

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
