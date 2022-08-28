module.exports = function(server){

	server.get("/", (request, response) => {
		response.render("home/index.ejs")
	})

}