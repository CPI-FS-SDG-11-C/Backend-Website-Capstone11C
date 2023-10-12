const { getRth, getRthByKecId, getDetailRth  } = require('../services/rth.service');

exports.getAll = async (req, res) => {
    try {
        const rths = await getRth();

        if (rths.length === 0) {
            return res.status(404).json({
                'status': 'failed',
                'code': 404,
                'message': 'RTH tidak ditemukan'
            });
        }

        const formattedRths = rths.map(rth => ({
            _id: rth._id,
            Jenis: rth.Jenis,
            Kelurahan: rth.Kelurahan,
            Nama: rth.Nama,
            Lokasi: rth.Lokasi,
            Luas: `${(rth.Luas).toLocaleString('en-US')} m²`,
            kec_id: rth.kec_id
        }))

        return res.status(200).json({
            'status': 'success',
            'code': 200,
            'message': 'RTH berhasil didapatkan',
            'data': formattedRths
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


exports.getRthByKecId = async (req, res) => {
    try {
        const kecId = req.params.kecId;
        const rths = await getRthByKecId(kecId);

        if (!rths) {
            return res.status(404).json({
                status: 'failed',
                code: 404,
                message: 'RTH tidak ditemukan',
            });
        }

        const formattedRths = rths.map(rth => ({
            _id: rth._id,
            Jenis: rth.Jenis,
            Kelurahan: rth.Kelurahan,
            Nama: rth.Nama,
            Lokasi: rth.Lokasi,
            Luas: `${(rth.Luas).toLocaleString('en-US')} m²`,
            kec_id: rth.kec_id
        }))

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'List RTH berhasil didapatkan',
            data: formattedRths,
        });

    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            code: 500,
            message: err.message,
        });
    }
};

exports.getDetailRth = async (req, res) => {
    try {
        const rthId = req.params.rthId;
        const rth = await getDetailRth(rthId);

        if (!rth) {
            return res.status(404).json({
                status: 'failed',
                code: 404,
                message: 'RTH tidak ditemukan',
            });
        }

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Detail RTH berhasil didapatkan',
            data: rth,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'failed',
            code: 500,
            message: err.message,
        });
    }
};
