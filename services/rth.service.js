const Rth = require('../models/Rth');

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

module.exports = {
    getRth,
    getRthByKecId,
    getDetailRth
}
