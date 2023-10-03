const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone_number: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);