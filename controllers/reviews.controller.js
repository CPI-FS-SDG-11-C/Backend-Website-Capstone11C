const { addReview, getReviewsByRthId } = require('../services/reviews.service');
const { getDetailRth } = require('../services/rth.service');
const { getUserIdByUsername } = require('../services/users.service');

exports.addReview = async (req, res) => {
  try {
    const userId = await getUserIdByUsername(req.username);
    
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

    const rth = await getDetailRth(rthId);
    if (!rth) {
      return res.status(400).json({
        'status': 'failed',
        'code': 400,
        'message': 'RTH tidak ditemukan di database'
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