const attraction = require('../models/attraction');

async function getAttraction() {
    const attractions = await attraction.find();
    // console.log(attractions);
    return attractions;
}
async function getAttractionByRTH(RTH) {
    const attractions = await attraction.find(RTH);
    // console.log(attractions);
    return attractions;
}

module.exports = {
    getAttraction,
    getAttractionByRTH
}
