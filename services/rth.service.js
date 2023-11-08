const Rth = require('../models/Rth');
const SubDistrict = require('../models/SubDistrict');

async function getRth() {
    const rths = await Rth.find();
    return rths;
}

async function getRthByKecId(kecId) {
    const rths = await Rth.find({ kec_id: kecId }).populate('kec_id').exec();
    return rths;
}

async function getDetailRth(rthId) {
    const rths = await Rth.findById(rthId);
    return rths;
}

async function getDIstrictAndRTH() {
  const populatedData = await Rth.find()
    .populate('kec_id')
    .exec();

  const manipulatedData = populatedData.map(item => {
    const { _id, Jenis, Kelurahan, Nama, Lokasi, Luas, kec_id } = item;

    const kecId = kec_id ? kec_id._id : null;

    return {
      _id,
      Jenis,
      Kelurahan,
      Nama,
      Lokasi,
      Luas,
      kec_id: kecId,
    };
  });

  const groupedData = manipulatedData.reduce((result, item) => {
    const key = item.kec_id;
    if (!result[key]) {
      result[key] = {
        kec_id: key,
        totalLuas: 0,       
        data_RTH: [],
      };
    }
    result[key].totalLuas += item.Luas;
    result[key].data_RTH.push(item);
    return result;
  }, {});

  for (const key in groupedData) {
    const kec_id = key;
    const additionalInfo = await SubDistrict.findOne({ _id: kec_id }); 
    if (additionalInfo) {
      groupedData[key].luas_kec = additionalInfo.luas_kec;
      groupedData[key].nama_kec = additionalInfo.nama_kec;
    }
  }

  for (const key in groupedData) {
    const totalLuas = groupedData[key].totalLuas;
    const luas_kec = groupedData[key].luas_kec;
    
    groupedData[key].percentage = ((totalLuas / luas_kec) * 100).toFixed(2);
  }

  const groupedArray = Object.values(groupedData);

  return groupedArray;
}




module.exports = {
    getRth,
    getRthByKecId,
    getDetailRth,
    getDIstrictAndRTH
}
