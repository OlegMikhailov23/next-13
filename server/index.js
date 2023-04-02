const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {randomBytes} = require('crypto');

app.use(bodyParser.json());
app.use(cors());
const posts = [];

app.get('/posts', (req, res) => {
  res.send(posts);
})

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  posts[id] = {id, title};
  posts.push(posts[id]);
  res.status(201).send(posts[id]);
})

app.get('/markup/header', (req, res) => {
  res.status(200).send(
    `<header style="background-color: #279fe5">
      <nav class="container" style="display: flex; align-items: center; height: 50px">
        <a href="/">
          <img style="width: 30px; height: 30px; border-radius: 50%;" src="https://e7.pngegg.com/pngimages/76/607/png-clipart-blog-logo-others-text-service.png" alt="My Supper Logo" />
        </a>
          <ul style="display: flex; align-items: center; width: 100%; margin-bottom: 0">
            <li style="display: block; width: 60px; color: #ffffff">
              <a style="color: #ffffff; font-size: 1rem" href="/">Home</a>
            </li>
            <li style="display: block; width: 60px; color: #ffffff">
              <a style="color: #ffffff; font-size: 1rem" href="/posts">Posts</a>
            </li>
          </ul>
      </nav>
    </header>
    `
  );
})

app.listen(4000, (req, res) => {
  console.log('Listening on 4000')
})
