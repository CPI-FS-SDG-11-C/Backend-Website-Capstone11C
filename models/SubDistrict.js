const moongose = require('mongoose');

const subdistrictSchema = new moongose.Schema({
    _id: String,
    nama_kec: String,
    kode_kec: String,
    luas_kec: Number,
});

module.exports = moongose.model('SubDistrict', subdistrictSchema);