const express = require('express');
const bodyParser = require('body-parser');
const Employees = require("./models/employees");




const { getStoredPosts, storePosts } = require('./data/posts');

const mongoose = require('mongoose');



const dbUrl = 'mongodb://localhost:27017/Admin-portal';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const employees = await Employees.findById(req.params.id)
  // const storedPosts = await getStoredPosts();
  // const post = storedPosts.find((post) => post.id === req.params.id);
  // res.json({ post });
  res.json({posts: employees});
});

app.post('/posts', async (req, res) => {
  // const existingPosts = await getStoredPosts();
  // const postData = req.body;
  // const newPost = {
  //   ...postData,
  //   id: Math.random().toString(),
  // };
  // const updatedPosts = [newPost, ...existingPosts];
  // await storePosts(updatedPosts);
  // res.status(201).json({ message: 'Stored new post.', post: newPost });
  const newEmployee = new Employees(req.body);
  await newEmployee.save();
  res.status(201).json({ message: 'Stored new post.' });
  
});

app.delete('/posts/:id', async (req,res) => {
  const { id } = req.params;
  await Employees.findByIdAndDelete(id);
  res.status(202).json({ message: 'Deleted the post.' });
})

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.body.postData);
  const editedEmployee = await Employees.findByIdAndUpdate(id, { ...req.body });
  await editedEmployee.save();
  res.status(200).json({ message: 'Edited the post.' });
})




app.listen(9090);
