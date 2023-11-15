import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import post from './routes/post'

const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()

app.use(express.json())
app.use('/posts', post)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const mongoUri = process.env.MONGO_URI

if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in .env file')
}

mongoose.connect(mongoUri)

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', err => {
    console.error('Error connecting to MongoDB', err)
})
