import express from 'express'
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword, checkAuth, getMe } from '../controllers/auth.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/check', protect, checkAuth)
router.get('/me', protect, getMe)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', protect, logoutUser)
router.post('/recover', forgotPassword)
router.put('/reset-password/:resettoken', resetPassword)

export default router
