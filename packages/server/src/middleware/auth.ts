import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { TokenPayload } from '../types/user'

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined in the environment')
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload

            // Add user information to the request
            req.user = { userId: decoded.userId }
            next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' })
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
}
