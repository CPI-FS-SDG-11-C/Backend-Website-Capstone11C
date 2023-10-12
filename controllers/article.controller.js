const { addArticle, getArticle, getDetailArticle } = require('../services/article.service');

exports.addArticle = async (req, res) => {
    try {
        const { judul, teks, gambar, pengarang } = req.body;

        const article = await addArticle(
            { judul, teks, gambar, pengarang }
        );

        return res.status(201).json({
            'status': 'success',
            'code': 201,
            'message': 'article successfully added',
            'data': article
        });
    }
    catch (err) {
        return res.status(500).json({
            'status': 'failed',
            'code': 500,
            'message': err.message
        });
    }
}

exports.getArticle = async (req, res) => {
    try {
        const articles = await getArticle();

        if (articles.length === 0) {
            return res.status(404).json({
                'status': 'failed',
                'code': 404,
                'message': 'Tidak ada artikel'
            });
        }

        const formattedArticles = articles.map(article => ({
            _id: article._id,
            judul: article.judul,
            teks: article.teks.substring(0, 70) + "...",
            gambar: article.gambar,
        }))

        return res.status(200).json({
            'status': 'success',
            'code': 200,
            'message': 'Artikel berhasil didapatkan',
            'data': formattedArticles
        });
    }
    catch (err) {
        return res.status(500).json({
            'status': 'failed',
            'code': 500,
            'message': err.message
        });
    }
}

exports.getDetailArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const article = await getDetailArticle(articleId);

        if (!article) {
            return res.status(404).json({
                status: 'failed',
                code: 404,
                message: 'Artikel tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Detail Artikel berhasil didapatkan',
            data: article,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            code: 500,
            message: err.message,
        });
    }
};
