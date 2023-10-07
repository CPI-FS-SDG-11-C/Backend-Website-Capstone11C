const Article = require('../models/Article');

async function addArticle(article) {
    const newArticle = await Article.create(article);
    return newArticle;
  }

async function getArticle() {
    const articles = await Article.find();
    return articles;
}

async function getDetailArticle(articleId) {
    const articles = await Article.findById(articleId);
    return articles;
}

module.exports = {
    addArticle,
    getArticle,
    getDetailArticle,
}
