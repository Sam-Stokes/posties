import { Request, Response } from 'express'
import Post from '../models/post' // Ensure this path is correct

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const newPost = new Post(req.body)
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            res.status(400).json({ message: (error as { message: string }).message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
