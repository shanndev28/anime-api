import express from 'express'
import { animeOngoing, animeDetail, searchByName, animeVideo, animeGenre, searchByGenre, animeComplete } from '../control/SearchAnime.js'

const router = express.Router()

router.get("/anime/genre", animeGenre)
router.get("/anime/nonton/:id", animeVideo)
router.get("/anime/details/:id", animeDetail)
router.get("/anime/search/:title", searchByName)
router.get("/anime/genre/:genre", searchByGenre)
router.get("/anime/ongoing/:page", animeOngoing)
router.get("/anime/complete/:page", animeComplete)

export default router