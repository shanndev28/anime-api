import History from '../model/History.js'

export const getHistory = async (req, res) => {
    if (!req.session) return res.status(401).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const history = await History.findAll({
            where: {
                session: req.sessionID
            },
            order: [['updatedAt', 'DESC']],
            limit: req.body.limit ? req.body.limit : 10,
            attributes: ['anime_id', 'anime_title', 'anime_poster', 'episode_title', 'episode_links']
        })

        if (!history || !history.length) return res.status(404).json({ error: true, message: "Data history tidak ditemukan" })
        return res.status(200).json({ error: false, data: history })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const getHistoryLatest = async (req, res) => {
    if (!req.session) return res.status(401).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const history = await History.findOne({
            where: {
                session: req.sessionID
            },
            order: [['updatedAt', 'DESC']],
            attributes: ['anime_id', 'anime_title', 'anime_poster', 'episode_title', 'episode_links']
        })

        if (!history) return res.status(404).json({ error: true, message: "Data history tidak ditemukan" })
        return res.status(200).json({ error: false, data: history })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const tambahHistory = async (req, res) => {
    const { animeTitle, animePoster, episodeTitle, episodeLinks } = req.body
    if (!req.session) return res.status(401).json({ error: true, message: "Login terlebih dahulu" })
    if (!animeTitle || !animePoster || !episodeTitle || !episodeLinks) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        const history = await History.findOne({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            }
        })

        if (history) {
            await History.update({
                anime_title: animeTitle,
                anime_poster: animePoster,
                episode_title: episodeTitle,
                episode_links: episodeLinks
            }, {
                where: {
                    uuid: history.uuid,
                    session: req.sessionID
                }
            })
        } else {
            await History.create({
                anime_id: req.params.id,
                session: req.sessionID,
                anime_title: animeTitle,
                anime_poster: animePoster,
                episode_title: episodeTitle,
                episode_links: episodeLinks
            })
        }

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}

export const hapusHistory = async (req, res) => {
    if (!req.session) return res.status(401).json({ error: true, message: "Login terlebih dahulu" })

    try {
        const history = await History.findOne({
            where: {
                session: req.sessionID,
                anime_id: req.params.id
            }
        })

        if (!history) return res.status(404).json({ error: true, message: "Data history tidak ditemukan" })

        await History.destroy({
            where: {
                uuid: history.uuid,
                session: req.sessionID
            }
        })

        return res.status(200).json({ error: false, message: "Data berhasil dihapus" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}