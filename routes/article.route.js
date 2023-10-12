const router = require('express').Router();

const { addArticle , getArticle, getDetailArticle} = require('../controllers/article.controller');

router.post('/add', addArticle);

router.get('/', getArticle);

router.get('/:articleId', getDetailArticle);

module.exports = router;