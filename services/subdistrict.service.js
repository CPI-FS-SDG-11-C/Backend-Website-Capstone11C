const SubDistrict = require('../models/SubDistrict');

async function getSubDistricts() {
    const subdistricts = await SubDistrict.find();
    // console.log(subdistricts);
    return subdistricts;
}

module.exports = {
    getSubDistricts
}
