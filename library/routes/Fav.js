import express from 'express';
import { getFavorite, getFavoriteById, tambahFavorite, hapusFavorite } from '../control/Fav.js'

const router = express.Router()

router.post("/favorite", getFavorite)
router.get("/favorite/:id", getFavoriteById)
router.patch("/favorite/:id", tambahFavorite)
router.delete("/favorite/:id", hapusFavorite)

export default router