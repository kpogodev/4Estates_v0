import express from 'express'
import { uploadAvatar, addPremium, updatePremium, deletePremium } from '../controllers/users.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/avatar').post(protect, uploadAvatar)
router.route('/premium').post(protect, addPremium).put(protect, updatePremium).delete(protect, deletePremium)



export default router
