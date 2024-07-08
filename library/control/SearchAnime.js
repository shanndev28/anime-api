import axios from 'axios'
import cheerio from 'cheerio'

export const animeOngoing = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.page) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/ongoing/page/${req.params.page}/`)
            .then(({ data }) => {
                let $ = cheerio.load(data)

                $("div.main-col > div.xrelated").get().map(async (a, b) => {
                    let image = $(a).find("a > img").attr("src").trim()
                    let title = $(a).find("a > img").attr("alt").trim()
                    let aniid = $(a).find("a").attr("href").replace("https://oploverz.co.id/", "").replace("/", "")

                    array.push({ aniid, title, image })
                })

                if (!array || !array.length) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: array })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const animeComplete = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.page) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/complete/page/${req.params.page}/`)
            .then(({ data }) => {
                let $ = cheerio.load(data)

                $("div.main-col > div.xrelated").get().map(async (a, b) => {
                    let image = $(a).find("a > img").attr("src").trim()
                    let title = $(a).find("a > img").attr("alt").trim()
                    let aniid = $(a).find("a").attr("href").replace("https://oploverz.co.id/", "").replace("/", "")

                    array.push({ aniid, title, image })
                })

                if (!array || !array.length) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: array })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const animeDetail = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/${req.params.id}/`)
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let image = $("div.clearfix > img").attr("src").trim()
                let title = $("div.clearfix > img").attr("alt").trim()
                let genre = $("ul.infopost > li:last-child").text().replace("Genre: ", "")
                let rilis = $("ul.infopost > li:nth-child(6)").text().replace("Rilis: ", "")
                let studio = $("ul.infopost > li:nth-child(7)").text().replace("Studio: ", "")
                let status = $("ul.infopost > li:nth-child(9)").text().replace("Status: ", "")

                $("div.bottom-line > a.othereps").get().map(async (a, eps) => {
                    let title = $(a).text().trim()
                    let aniid = $(a).attr("href").replace("/anime/", "").replace("/", "")

                    array.push({ eps, aniid, title })
                })

                if (!array || !array.length) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: { status, studio, rilis, title, genre, image, episode: array } })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const searchByName = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.title) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/search/?q=${req.params.title}`)
            .then(({ data }) => {
                let $ = cheerio.load(data)

                $("div.main-col > div.xrelated").get().map(async (a, b) => {
                    let image = $(a).find("a > img").attr("src").trim()
                    let title = $(a).find("a > img").attr("alt").trim()
                    let aniid = $(a).find("a").attr("href").replace("https://oploverz.co.id/", "").replace("/", "")

                    array.push({ aniid, title, image })
                })

                if (!array || !array.length) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: array })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const searchByGenre = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.genre) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/filter-anime/?orderby=1&studio=0&genres1=${req.params.genre}&genres2=0`)
            .then(({ data }) => {
                let $ = cheerio.load(data)

                $("div.main-col > div.xrelated").get().map(async (a, b) => {
                    let image = $(a).find("a > img").attr("src").trim()
                    let title = $(a).find("a > img").attr("alt").trim()
                    let aniid = $(a).find("a").attr("href").replace("https://oploverz.co.id/", "").replace("/", "")

                    array.push({ aniid, title, image })
                })

                if (!array || !array.length) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: array })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const animeVideo = async (req, res) => {
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter invalid" })

    try {
        await axios.get(`https://oploverz.co.id/anime/${req.params.id}/`)
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let video = $("div.contstream > iframe").attr("src").trim()
                let title = $("div.post-body > h1.title-post").text().trim()

                if (!video || !title) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: { aniid: req.params.id, title, video } })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}

export const animeGenre = async (req, res) => {
    let array = []
    if (!req.session) return res.status(400).json({ error: true, message: "Login terlebih dahulu" })

    try {
        await axios.get("https://oploverz.co.id/anime-list/")
            .then(({ data }) => {
                let $ = cheerio.load(data)

                $("select#genres1 > option").get().map(async (a, b) => {
                    let genre = $(a).text().trim()
                    if (genre === "-- Pilih Genre 1 --") return

                    array.push(genre)
                })

                if (!array || !array.length) return res.status(404).json({ error: true, message: "Tidak ditemukan" })
                return res.status(200).json({ error: false, data: array })
            })
            .catch(() => { return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" }) })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Gagal mendapatkan konten" })
    }
}