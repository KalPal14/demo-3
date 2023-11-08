import http from 'http'

const host = '127.0.0.1'
const port = 8000

const server = http.createServer((req, res) => {
   switch (req.method) {
      //Очень неудобно!!!
      case 'GET':
         switch (req.url) {
            case '/':
               res.statusCode = 200
               res.setHeader('Content-Type', 'text/plain')
               res.end("Домашняя страница")
               break
            case '/hello':
               res.statusCode = 200
               res.setHeader('Content-Type', 'text/plain')
               res.end("Привет!!!")
               break 
         }
         break
   }
})

server.listen(port, host, () => {
   console.log(`Сервер запущен ${host}:${port}`)
})

