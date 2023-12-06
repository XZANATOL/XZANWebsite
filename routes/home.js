module.exports = function(server){

	server.get("/", (request, response) => {
		return response.render("home/index.ejs", {seo: {}})
	})

}