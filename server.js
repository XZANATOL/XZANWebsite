//dev use
require('dotenv').config()
const port = 3000

const bodyParser = require("body-parser")
const express = require("express")
const server = express()

const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb(process.env.AWS_TABLE_NAME)



server.set('view engine', 'ejs')
server.set("views", "./views/")

server.use(express.json())
server.use(express.urlencoded({
	extended: true
}))


server.use(express.static("public"))


require("./routes/home")(server)
require("./routes/redirects")(server, db)
require("./routes/portfolio")(server, db)
require("./routes/blog")(server)
require("./routes/admin")(server, db)


server.listen(port, () => {
	console.log(`Listening on port ${port}`)
	//db_migrator()
})