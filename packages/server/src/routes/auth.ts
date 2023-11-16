import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/auth'
import { redirectToInstagram, handleInstagramCallback } from '../controllers/auth'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/authorize-instagram', redirectToInstagram)
router.get('/auth/instagram/callback', handleInstagramCallback)

export default router

// https://developers.facebook.com/docs/instagram-api/getting-started
// https://developers.facebook.com/docs/facebook-login
