const moongose = require('mongoose');

const reviewSchema = new moongose.Schema({
    id_user: {
        type: String,
        required: true,
    },
    id_rth: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    created_at: {
        type: String,
        required: true,
    }
});

module.exports = moongose.model('Review', reviewSchema);