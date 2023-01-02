const fs = require("fs")

module.exports = function(server, db){

	server.get("/brag_doc", async (request, response) => {
		let temp = await db.collection("brag").list()
		let brags = []
		temp.results.forEach((brag) => {
			brags.push(brag.key)
		})

		let context = {
			"brags": brags
		}
		return response.render("brag_doc/index.ejs", context)
	})


	server.post("/brag_doc/months", async (request, response) => {
		let params = {
			"year": request.body.year
		}
		const err = JSON.stringify([])

		if (params.year == ""){
			return response.send(err)
		}

		let brag = await db.collection("brag").get(params.year)
		if (brag == null){
			return response.send(err)
		}
		let months = Object.keys(brag.props)
		let monthsFiltered = []
		months.forEach( (month) => {
			if (month != "updated" && month != "created"){
				monthsFiltered.push(month)
			}
		})
		return response.send(JSON.stringify(monthsFiltered))
	})


	server.post("/brag_doc", async (request, response) => {
		let params = {
			"year": request.body.year,
			"month": request.body.month
		}
		const err = JSON.stringify([])

		if (params.year == "" || params.month == ""){
			return response.send(err)
		}

		let brag = await db.collection("brag").get(params.year)
		if (brag == null){
			return response.send(err)
		}
		brag = brag.props[params.month]
		if (brag == undefined){
			return response.send(err)
		}
		return response.send(JSON.stringify(brag))
	})

}