import express from 'express'

const port = 8000
const app = express()

app.get('/hello', (req, res) => {
   res.cookie('token', 'devjoeinvevnreoineron', {
      domain: '',
      path: '/',
      // нужно ли шифровать
      secure: true,
      // когда очистить ms
      expires: 60000
   })
   res.send('Привет!!!')
})

app.listen(port, () => {
   console.log(`Сервер запущен http://localhost:${port}`)
})

