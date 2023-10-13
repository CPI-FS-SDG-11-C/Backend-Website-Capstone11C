const { addReview } = require('../services/reviews.service');
const { getUserIdByUsername } = require('../services/users.service');

exports.addReview = async (req, res) => {
  try {
    const username = req.username
    const userId = await getUserIdByUsername(username);
    

    if (userId === undefined) {
      return res.status(401).json({
        'status': 'failed',
        'code': 401,
        'message': 'User tidak ditemukan'
      });
    }

    const rthId = req.params.rthId;

    if (!rthId) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'RTH tidak ditemukan'
      });
    }

    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'Rating tidak boleh kosong'
      });
    }

    const newReview = await addReview({ id_user: userId, id_rth: rthId, rating, comment: comment || '' });

    return res.status(201).json({
      'status': 'success',
      'code': 201,
      'message': 'Review berhasil ditambahkan',
      'data': newReview
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