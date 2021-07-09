const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://melissa:7YjlurtOoSGhYOsq@cluster0.icglg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
)
  .then(() => {
    console.log('Connected to database')
  })
  .catch (() => {
    consol.log('Connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/diary', (req, res, next) => {
  const post = new Post({
    date: req.body.date,
    location: req.body.location,
    entry: req.body.entry,
    photo: req.body.photo
  });
  post.save();
  res.status(201).json({ message: 'post added' });
});

app.get('/diary', (req, res, next) => {
  const posts = [
    {
      id: '98sdf',
      date: '10/07/2020',
      location: 'Northland',
      entry: 'Super awsome fun land',
      photo: 'pic url'
    },
    {
      id: 'sdf4',
      date: '07/07/2021',
      location: 'Up North',
      entry: 'Super awsome fun land',
      photo: 'pic url'
    }
  ];
  res.status(200).json({ message: 'posts fetched', posts: posts });
});

module.exports = app;
