const http = require('http')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const PORT = 8080

const server = http.createServer((req, res) => {
    const frontEnd = path.join(__dirname, "views", req.url == "/" ? "index.ejs" : req.url)

    const countries = ["United States of America", "Brazil", "Qatar", "Autralia", "Iraq", "Oman", "Bahrain"]

    fs.readFile(frontEnd, 'utf-8', (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json"})
            res.write(JSON.stringify({ message: "Error Reading file/Internal Server Error" }))
            res.end()
        } else {
            const frontEndContent = ejs.render(content, { isTrue: true, countries })
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(frontEndContent)
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
})