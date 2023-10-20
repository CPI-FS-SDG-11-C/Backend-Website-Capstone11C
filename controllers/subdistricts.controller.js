const { getSubDistricts, getSubDistrictById } = require('../services/subdistricts.service');
const { getRthByKecId, getDetailRth } = require('../services/rth.service');

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
      luas_kec: `${(subdistrict.luas_kec).toLocaleString('en-US')} m²`
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

exports.getSubDistrictById = async (req, res) => {
  try {
    const subdistrictId = req.params.subdistrictId;
    const subdistrict = await getSubDistrictById(subdistrictId);
    
    if (!subdistrict) {
      return res.status(404).json({
        status: 'failed',
        code: 404,
        message: 'Kecamatan tidak ditemukan',
      });
    }


    const rth = await getRthByKecId(subdistrictId);
    const sumRTH = rth.reduce((total, item) => total + item.Luas, 0);
    const resRTH = (sumRTH /subdistrict.luas_kec) * 100

    console.log(sumRTH)
    console.log(subdistrict.luas_kec)
    console.log(resRTH.toFixed(2))
    // console.log(resRTH)

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Detail Kecamatan berhasil didapatkan',
      persentaseRTH : `${(resRTH.toFixed(2)).toLocaleString('en-US')}%`,
      data: subdistrict
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      code: 500,
      message: err.message,
    });
  }
};


