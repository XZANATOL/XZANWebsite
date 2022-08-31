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
require("./routes/portfolio")(server, db)

let db_migrator = async () => {
	//Presents till I progress the admin panel
	let collection = db.collection("portfolio")
	let headline = collection.set("data", {"greetings": "I'm a junior software developer interested in Backend Development and DevOps, and building my precense from the ground up - from the concept of how internet operates, how requests & responses are handled, and programmed to how to host, mantain, and monitor a web application along with being familiar with how frontend works. Currently, I'm putting my efforts into securing an internship opportunity to gain industry experience, and apply my knowledge in real world tasks.",
											"headline": "IT Specialist @ KD-Group, Software Engineer, DevOps",
											"discord_handle": "XZANATOL#1411"
	})
	//let t = await collection.get("data")
	console.log(headline)
}

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
	//db_migrator()
})