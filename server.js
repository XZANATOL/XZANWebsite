//dev use
require('dotenv').config()
const port = 3000

const express = require("express")
const server = express()

const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb(process.env.AWS_TABLE_NAME)

server.set('view engine', 'ejs')
server.set("views", "./views/")

server.use(express.static("public"))

require("./routes/home")(server)
require("./routes/redirects")(server, db)
require("./routes/portfolio")(server)

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
})