const express = require('express');
const path = require('path');

const mongoose = require('./config/mongoose.js');
const db = mongoose();

const indexRouter = require('./router/index');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/', indexRouter);

app.listen(3000,() => {
  console.log('app listening on port 3000.')
})

module.exports = app;
