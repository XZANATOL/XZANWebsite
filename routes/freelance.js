module.exports = (server, db) => {

	server.get("/freelance", async (request, response) => {
		let records = await db.collection("freelance").get("data")
		delete(records.props.created)
		delete(records.props.updated)
		records = Object.values(records.props)

		return response.render("freelance/index.ejs", {records: records})
	})
}