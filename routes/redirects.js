module.exports = function(server, db){

	server.get("/r/", async (request, response) => {
			return response.render("404.ejs", {seo: {}})
	})

	server.get("/r/:link", async (request, response) => {
		const link = await db.collection("redirects").get(request.params.link)

		if(!link){
			return response.render("404.ejs", {seo: {}})
		}
		return response.redirect(link.props.link)
	})

}