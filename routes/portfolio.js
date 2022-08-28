module.exports = function(server){

	server.get("/portfolio", (request, response) => {
		response.render("home/index.ejs")
	})

}