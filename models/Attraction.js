const moongose = require('mongoose');

const AttractionSchema = new moongose.Schema({
    
    nama: String,
    alamat: String,
    taman: String,
 
});

module.exports = moongose.model('Attraction', AttractionSchema);