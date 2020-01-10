const express = require('express');
const Router = require('./routes/index');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const http = require('http');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(morgan('dev'));
app.use('/user', Router.UserRoute);
app.use('/post', Router.PostRoute);
app.use('/excel', Router.ExcelRoute);
app.use('/comment', Router.CommentRoute);
const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Go to http://localhost:3000 to run queries!');
});


module.exports = app;
