const User = require('../models/User');

async function getUser(username) {
  const user = await User.find({ username: username });
  return user;
}

async function addUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

module.exports = {
  getUser,
  addUser
}