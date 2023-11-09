import express from 'express'

import { userRouter } from './users/users.js'

const port = 8000
const app = express()

app.get('/hello', (req, res) => {
   res.send('Привет!!!')
})

app.use('/users', userRouter)

app.listen(port, () => {
   console.log(`Сервер запущен http://localhost:${port}`)
})

