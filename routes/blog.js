module.exports = function(server){

	server.get("/blog", (request, response) => {
		const context = {
			"postCount": 5
		}

		return response.render("blog/index.ejs", context)
	})

}