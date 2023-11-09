import express from 'express'

const port = 8000
const app = express()

app.all('/hello', (req, res, next) => {
   console.log("All")
   next()
})

app.get('/hello', (req, res) => {
   res.send('Привет!!!')
})

app.listen(port, () => {
   console.log(`Сервер запущен http://localhost:${port}`)
})

