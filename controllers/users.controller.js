const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const bycrypt = require('bcrypt');
const { addUser, getUser } = require('../services/users.service');
const { get } = require('mongoose');
const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    const id = `user-${uuidv4()}`;
    const hashed = await bycrypt.hash(password, saltRounds);
    const user = await addUser({ _id: id, username, email, password: hashed, phone_number: phone_number.toString() });

    return res.status(201).json({
      'status': 'success',
      'code': 201,
      'message': 'user successfully registered',
      'data': user
    });
  }
  catch (err) {
    return res.status(500).json({
      'status': 'failed',
      'code': 500,
      'message': err.message
    });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);

    if (user.length === 0) {
      return res.status(404).json({
        'status': 'failed',
        'code': 404,
        'message': 'user not found'
      });
    }

    const match = await bycrypt.compare(password, user[0].password);

    if (!match) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'password incorrect'
      });
    }

    const token = jwt.sign(
      { username: username, password: password },
      process.env.SECRET_KEY, { expiresIn: '3h' });

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'user successfully logged in',
      'token': token
    });
  } catch (err) {
    return res.status(500).json({
      'status': 'failed',
      'code': 500,
      'message': err.message
    });
  }
}

exports.logout = async (req, res) => {
  return res.status(200).json({
    'status': 'success',
    'code': 200,
    'message': 'user successfully logged out'
  });
}