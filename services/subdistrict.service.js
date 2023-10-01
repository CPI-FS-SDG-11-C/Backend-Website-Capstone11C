const SubDistrict = require('../models/SubDistrict');

async function getSubDistricts() {
    const subdistricts = await SubDistrict.find();
    // console.log(subdistricts);
    return subdistricts;
}

async function getSubDistrictById(subdistrictId) {
    const subdistrict = await SubDistrict.findById(subdistrictId);
    return subdistrict;
}

module.exports = {
    getSubDistricts,
    getSubDistrictById
}
