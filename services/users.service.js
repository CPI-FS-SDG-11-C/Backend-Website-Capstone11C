const User = require('../models/User');

async function getUserByUsername(username) {
  const user = await User.find({ username: username });
  return user;
}

async function addUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

async function getUserById(id) {
  const profile = await User.find({ _id: id });
  return profile;
}

async function updateProfile(userId, updatedData) {
  const updateProfile = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  return updateProfile;
}

module.exports = {
  getUserByUsername,
  addUser,
  getUserById,
  updateProfile
}