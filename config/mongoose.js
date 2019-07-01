
const mongoose = require('mongoose');
const config = require('./config');
module.exports = () => {
  mongoose.connect(config.mongodb);
  
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '链接错误：'));
  db.once('open', (callback) => {
    console.log('MongoDB 连接成功！');
  });
  return db;
}
