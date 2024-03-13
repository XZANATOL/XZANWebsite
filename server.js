//dev use
require('dotenv').config()
const port = 3000

const bodyParser = require("body-parser")
const express = require("express")
const server = express()
const helmet = require("helmet")

const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb(process.env.AWS_TABLE_NAME)



server.set('view engine', 'ejs')
server.set("views", "./views/")

server.use(express.json())
server.use(express.urlencoded({
	extended: true
}))
server.use(helmet({
	contentSecurityPolicy: {
		directives: {
			"script-src": ["'self'", "'unsafe-inline'"],
			"script-src-attr": ["'self'", "'unsafe-inline'"],
			"img-src": ["*"]
		}
	}
}))


server.use(express.static("public"))
server.use("/freelance_static", express.static("views/freelance/portfolio"))


require("./routes/home")(server)
require("./routes/redirects")(server, db)
require("./routes/portfolio")(server, db)
require("./routes/blog")(server)
require("./routes/brag_doc")(server, db)
require("./routes/freelance")(server, db)

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
	//db_migrator()
})