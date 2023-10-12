const moongose = require('mongoose');

const articleSchema = new moongose.Schema({
    judul: String,
    teks: String,
    gambar: String,
    pengarang: String,
});

module.exports = moongose.model('Article', articleSchema);