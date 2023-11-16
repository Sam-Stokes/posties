import { Router } from 'express'
import { protect } from '../middleware/auth'
import { createPost } from '../controllers/post'

const router = Router()

// Define your routes here, for example:
router.post('/create', protect, createPost)

router.get('/posts', protect, (req, res) => {
    res.json({ message: 'Access granted' })
})

export default router
