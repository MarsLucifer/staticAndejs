const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080

const server = http.createServer((req, res) => {
    const frontEnd = path.join(__dirname, "public", req.url == "/" ? "index.html": req.url)
    const extensionName = path.extname(frontEnd)

    let conentType = "text/html"

    switch (extensionName) {
        case ".jpg":
            conentType = "img/jpg"
            break
        
        case ".js":
            conentType = "text/javascript"
            break;

        case ".css":
            conentType = "text/css"
            break;

        case ".json":
            conentType = "text/json"
            break;

        default:
            conentType = "text/html"
    }

    fs.readFile(frontEnd, (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json"})
            res.write(JSON.stringify({ message: "Error Reading file/Internal Server Error" }))
            res.end()
        } else {
            res.writeHead(200, { "Content-Type": conentType })
            res.end(content)
        }
        // res.writeHead(200, { "Content-Type": conentType })
        // res.end(content)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
})