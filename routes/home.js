module.exports = function(server, db){

	server.get("/", async (request, response) => {
		const data = await db.collection("portfolio").get("data")
		const context = {
			"headline": data.props.headline,
			"greetings": data.props.greetings,
		}
		const seo = {
			"title": "Abdelrahman Walied - XZANATOL",
			"description": "Personal Portfolio"
		}
		return response.render("home/index.ejs", {context: context, seo: seo})
	})

}