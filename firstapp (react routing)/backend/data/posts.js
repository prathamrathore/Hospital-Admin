const fs = require('node:fs/promises');
const Employees = require("../models/employees");

async function getStoredPosts() {
  const employees = await Employees.find({});

  const storedPosts = employees;
  return storedPosts;
}

function storePosts(posts) {
  return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;