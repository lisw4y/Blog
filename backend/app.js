const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    result: 'success'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '23jirejgio4',
      title: 'First Post',
      content: 'First Content'
    }
  ];
  res.status(200).json({
    result: 'success',
    posts: posts
  });
});

module.exports = app;