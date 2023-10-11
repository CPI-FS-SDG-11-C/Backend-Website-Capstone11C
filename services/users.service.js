const User = require('../models/User');

async function getUser(username) {
  const user = await User.find({ username: username });
  return user;
}

async function addUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

async function getUserIdByUsername(username) {
  const userId = await User.find({ username: username }, '_id');
  return userId[0]._id;
}

module.exports = {
  getUser,
  addUser,
  getUserIdByUsername
}