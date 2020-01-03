const express = require('express');
const Router = require('./routes/index');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/user', Router.UserRoute);
app.use('/post', Router.PostRoute);
app.use('/excel', Router.ExcelRoute);
app.use('/comment', Router.CommentRoute);

app.listen(3000, () => {
  console.log('Server is up on http://localhost:3000 !');
});

module.exports = app;