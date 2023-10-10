const moongose = require('mongoose');

const rthSchema = new moongose.Schema({
    Jenis: String,
    Kelurahan: String,
    Nama: String,
    Lokasi: String,
    Luas: Number,
    kec_id: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'SubDistrict'
    }
}, {
    collection: 'RTH'
});

module.exports = moongose.model('RTH', rthSchema);