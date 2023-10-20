const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bycrypt = require('bcrypt');
const { addUser, getUserById, getUserByUsername, updateProfile } = require('../services/users.service');
const saltRounds = 10;
const User = require('../models/User'); 

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

    const user = await getUserByUsername(username);

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
      { userId: user[0]._id , password: password },
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

// get profile
exports.profile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserById(userId);

    if (!user) {
      return null;
    }

    const formatedProfile = {
      username:user[0].username,
      email : user[0].email,
      phone_number : user[0].phone_number,
    }

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'User profile data successfully retrieved.',
      'data': formatedProfile
    });
  } catch (err) {
    return res.status(500).json({
      'status': 'failed Get Profile',
      'code': 500,
      'message': err.message
    });
    
  }
}

exports.updateProfile = async (req, res) => {
try {
  const userId = req.userId;
  
  if (userId === undefined) {
    return res.status(401).json({
      'status': 'failed',
      'code': 401,
      'message': 'User tidak ditemukan'
    });
  }

  const updatedData = req.body
  
  if (!updatedData.username) {
    return res.status(400).json({
      'status': 'failed',
      'code': 400,
      'message': 'username tidak boleh kosong'
    });
  }
  if (!updatedData.email) {
    return res.status(400).json({
      'status': 'failed',
      'code': 400,
      'message': 'email tidak boleh kosong'
    });
  }
  if (!updatedData.phone_number) {
    return res.status(400).json({
      'status': 'failed',
      'code': 400,
      'message': 'Nomor Telepon tidak boleh kosong'
    });
  }

  const updatedProfile = await updateProfile(userId, updatedData)

  // const newToken = jwt.sign({ username: updatedData.username }, process.env.SECRET_KEY, { expiresIn: '3h' });
  return res.status(200).json({
    'status': 'success',
    'code': 200,
    'message': 'Profile successfully updated',
    // 'token' : newToken,
    'data' : updatedProfile
  });
} catch (err) {
    return res.status(500).json({
      'status': 'failed',
      'code': 500,
      'message': err.message
    });
  }
}

exports.changepassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    const user = await getUserByUsername(username);
    console.log(user);

    if (user.length === 0) {
      return res.status(404).json({
        'status': 'failed',
        'code': 404,
        'message': 'User not found',
      });
    }

    const match = await bycrypt.compare(currentPassword, user[0].password);

    if (!match) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'Current password is incorrect',
      });
    }

    const userId = user[0]._id;

    const saltRounds = 10;
    const hashedNewPassword = await bycrypt.hash(newPassword, saltRounds);

    await User.updateOne({ _id: userId }, { password: hashedNewPassword });

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Password changed successfully',
    });
  } catch (err) {
    return res.status(500).json({
      'status': 'failed',
      'code': 500,
      'message': err.message,
    });
  }
}





