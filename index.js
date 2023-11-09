import express from 'express'

import { userRouter } from './users/users.js'

const port = 8000
const app = express()

app.use('/hello', (res, req, next) => {}) // для всех роутов /hello

app.get('/hello', (req, res) => {
   throw new Error('Error!!!')
})

app.use('/users', userRouter)

// Обработчик ошибок должен
// находится под обработчиками роутов
app.use((err, req, res, next) => {
   res.status(401).send(err.message)
})

app.listen(port, () => {
   console.log(`Сервер запущен http://localhost:${port}`)
})

