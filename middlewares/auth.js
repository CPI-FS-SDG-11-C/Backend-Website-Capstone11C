const jwt = require('jsonwebtoken');

exports.authentication = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      code: 401,
      message: 'No token provided'
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        code: 500,
        message: 'Failed to authenticate token'
      });
    }

    req.userId = decoded.userId;

    next();
  });
}