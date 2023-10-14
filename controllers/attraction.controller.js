const { getAttraction, getAttractionByRTH } = require('../services/attraction.service.js');

exports.getAll = async (req, res) => {
  try {
    const Attractions = await getAttraction();
    
    if (Attractions.length === 0) {
      return res.status(404).json({
        'status': 'failed',
        'code': 404,
        'message': 'Wisata tidak ditemukan'
      });
    }

    const formattedAttractions = Attractions.map(attraction => ({
      _id: attraction._id,
      nama: attraction.nama,
      alamat: attraction.alamat,      
      taman: attraction.taman      
    }))

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Wisata berhasil didapatkan',
      'data': formattedAttractions
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

exports.getByRTH = async (req, res) => {
  try {
    const Attractions = await getAttractionByRTH({taman: req.params.RTH});
    
    if (Attractions.length === 0) {
      return res.status(404).json({
        'status': 'failed',
        'code': 404,
        'message': 'Wisata tidak ditemukan'
      });
    }

    const formattedAttractions = Attractions.map(attraction => ({
      _id: attraction._id,
      nama: attraction.nama,
      alamat: attraction.alamat,      
      taman: attraction.taman      
    }))

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Wisata berhasil didapatkan',
      'data': formattedAttractions
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