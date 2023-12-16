module.exports = function(server){

	server.get("/", (request, response) => {
		const seo = {
			"title": "Abdelrahman Walied - XZANATOL",
			"description": "Personal Portfolio"
		}
		return response.render("home/index.ejs", {seo: seo})
	})

}