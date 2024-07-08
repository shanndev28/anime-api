import express from 'express';
import { getHistory, getHistoryLatest, tambahHistory, hapusHistory } from '../control/History.js'

const router = express.Router()

router.post("/history", getHistory)
router.get("/history/latest", getHistoryLatest)
router.patch("/history/:id", tambahHistory)
router.delete("/history/:id", hapusHistory)

export default router