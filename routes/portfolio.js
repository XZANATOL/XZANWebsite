module.exports = function(server){

	server.get("/portfolio", (request, response) => {
		return response.render("portfolio/index.ejs")
	})

}