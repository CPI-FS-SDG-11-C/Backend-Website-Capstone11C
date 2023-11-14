const { addReview, getReviewsByRthId, getReviewsByUserId } = require('../services/reviews.service');
const { getDetailRth } = require('../services/rth.service');
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


exports.getReviewsByRthId = async (req, res) => {
  try {
    const rthId = req.params.rthId;
    
    if (!rthId) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'RTH tidak ditemukan'
      });
    }

    const rth = await getDetailRth(rthId);
    const reviews = await getReviewsByRthId(rthId);

    const rthWithReviews = { 
      name: rth.Nama,
      reviews: [
        ...reviews
      ]
    };

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Review berhasil didapatkan',
      'data': rthWithReviews
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

exports.getReviewsByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'User tidak ditemukan'
      });
    }

    const reviews = await getReviewsByUserId(userId);

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Review berhasil didapatkan',
      'data': reviews
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