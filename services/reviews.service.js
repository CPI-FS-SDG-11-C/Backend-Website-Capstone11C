const Review = require('../models/Review');

async function addReview(review) {
    const newReview = await Review.create(review);
    return newReview;
}

module.exports = {
    addReview
}