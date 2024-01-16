const fs = require("fs")

module.exports = (server, db) => {

	server.get("/syscraft", async (request, response) => {
		const seo = {
			"title": "SysCraft",
			"description": "Craft an idea, Systemize it in reality."
		}
		return response.render("freelance/index.ejs", {seo: seo})
	})


	server.get("/syscraft/record/:folder", async (request, response) => {
		const folder = request.params.folder.replaceAll("..", "")
		const file = JSON.parse(fs.readFileSync(`${__dirname}/../views/freelance/portfolio/${folder}/data.json`))
		
		return response.send(JSON.stringify(file))
	})


	server.get("/syscraft/:idx", async (request, response) => {
		const startID = parseInt(request.params.idx)
		const pageSize = 2
		if (Number.isInteger(startID) && startID >= 0){
			const recordsJSON = JSON.parse(fs.readFileSync(`${__dirname}/../views/freelance/portfolio/records.json`))

			let nextIDX = startID+pageSize
			if (startID+pageSize >= recordsJSON.length){
				nextIDX = -1
			}

			return response.send(JSON.stringify({
					fields: recordsJSON.slice(startID, startID+pageSize),
					nextIDX: nextIDX
				}))

		}else{

			response.status(400)
			return response.send(JSON.stringify({
				error: "Invalid request"
			}))

		}

	})
}