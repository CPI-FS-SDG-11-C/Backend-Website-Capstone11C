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

async function getProfile(username) {
  const profile = await User.find({ username: username });
  return profile;
}

async function updateProfile(userId, updatedData) {
  const updateProfile = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  return updateProfile;
}

module.exports = {
  getUser,
  addUser,
  getUserIdByUsername,
  getProfile,
  updateProfile
}