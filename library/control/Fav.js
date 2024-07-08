import Fav from '../model/Fav.js'

export const getFavorite = async (req, res) => {
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const favorite = await Fav.findAll({
            where: {
                session: req.sessionID
            },
            limit: req.body.limit ? req.body.limit : 20,
            order: [['updatedAt', 'DESC']],
            attributes: ['anime_id', 'anime_title', 'anime_poster', 'anime_links']
        })

        if (!favorite || !favorite.length) return res.status(404).json({ error: true, message: "Data favorite tidak ditemukan" })
        return res.status(200).json({ error: false, data: favorite })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const getFavoriteById = async (req, res) => {
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const favorite = await Fav.findOne({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            },
            attributes: ['anime_id', 'anime_title', 'anime_poster', 'anime_links']
        })

        if (!favorite) return res.status(404).json({ error: true, message: "Data favorite tidak ditemukan" })
        return res.status(200).json({ error: false, data: favorite })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const tambahFavorite = async (req, res) => {
    const { animeTitle, animePoster, animeLinks } = req.body
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!animeTitle || !animePoster || !animeLinks) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        const favorite = await Fav.findOne({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            }
        })

        if (favorite) return res.status(400).json({ error: true, message: "Data favorite telah ada di database" })

        await Fav.create({
            session: req.sessionID,
            anime_id: req.params.id,
            anime_title: animeTitle,
            anime_poster: animePoster,
            anime_links: animeLinks
        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const hapusFavorite = async (req, res) => {
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const favorite = await Fav.findOne({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            }
        })

        if (!favorite) return res.status(404).json({ error: true, message: "Data favorite tidak ditemukan" })

        await Fav.destroy({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            }
        })

        return res.status(200).json({ error: false, message: "Data berhasil dihapus" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}