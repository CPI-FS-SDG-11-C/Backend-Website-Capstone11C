const Review = require('../models/Review');

async function addReview(review) {
    const createdAt = new Date().toISOString();
    review.created_at = createdAt;
    const newReview = await Review.create(review);
    return newReview;
}

module.exports = {
    addReview
}