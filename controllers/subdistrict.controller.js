const { getSubDistricts } = require('../services/subdistrict.service');

exports.getAll = async (req, res) => {
  try {
    const subdistricts = await getSubDistricts();
    
    if (subdistricts.length === 0) {
      return res.status(404).json({
        'status': 'failed',
        'code': 404,
        'message': 'Kecamatan tidak ditemukan'
      });
    }

    const formattedSubdistricts = subdistricts.map(subdistrict => ({
      _id: subdistrict._id,
      nama_kec: subdistrict.nama_kec,
      kode_kec: subdistrict.kode_kec,
      luas_kec: `${(subdistrict.luas_kec).toLocaleString('en-US')} km²`
    }))

    return res.status(200).json({
      'status': 'success',
      'code': 200,
      'message': 'Kecamatan berhasil didapatkan',
      'data': formattedSubdistricts
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