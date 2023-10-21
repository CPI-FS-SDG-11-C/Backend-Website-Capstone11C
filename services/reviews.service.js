const Review = require('../models/Review');

async function addReview(review) {
    const createdAt = new Date().toISOString();
    review.created_at = createdAt;
    const newReview = await Review.create(review);
    return newReview;
}

async function getReviewsByRthId(rthId) {
    const reviews = await Review.find({ id_rth: rthId });
    return reviews;
}

async function getReviewsByUserId(userId) {
    const reviews = await Review.find({ id_user: userId });
    return reviews;
}

module.exports = {
    addReview,
    getReviewsByRthId,
    getReviewsByUserId
}