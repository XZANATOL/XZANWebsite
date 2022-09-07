module.exports = function(server, db){

	server.get("/portfolio", async (request, response) => {
		const data = await db.collection("portfolio").get("data")
		const context = {
			"headline": data.props.headline,
			"greetings": data.props.greetings,
			"discord_handle": data.props.discord_handle,
			"resume": data.props.resume,
			"workExperience": data.props.workExperience,
			"educationExperience": data.props.educationExperience,
			"volunteer": data.props.volunteer,
			"techStack": data.props.techStack
		}
		return response.render("portfolio/index.ejs", context)
	})

}