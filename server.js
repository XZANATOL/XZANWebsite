const express = require("express")
const server = express()

server.set('view engine', 'ejs')
server.set("views", "./views/")

server.use(express.static("public"))

let port = 3000

require("./routes/home")(server)
require("./routes/portfolio")(server)



server.listen(port, () => {
	console.log(`Listening on port ${port}`)
})