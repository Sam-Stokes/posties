import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body
        const user = new User({ username, password })
        await user.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            res.status(400).json({ message: (error as { message: string }).message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            throw new Error('JWT secret not defined')
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            res.status(400).json({ message: (error as { message: string }).message })
        } else {
            res.status(500).json({ message: 'An unknown error occurred' })
        }
    }
}
