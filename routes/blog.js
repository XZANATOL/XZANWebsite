const fs = require("fs")

module.exports = function(server){

	server.get("/blog", (request, response) => {
		const dir = fs.readdirSync(`${__dirname}/../views/blog-articles/`)
		const context = {
			"postCount": 5,
			"categories": dir
		}
		return response.render("blog/index.ejs", context)
	})


	server.get("/blog/:cat", (request, response) => {
		let dir;
		try{
			dir = fs.readdirSync(`${__dirname}/../views/blog-articles/${request.params.cat}`)
		} catch{
			dir = []
		}
		const context = {
			"cat": request.params.cat,
			"topics": dir
		}
		// View will be changed with the next commit
		return response.render("blog/index_cat.ejs", context)
	})

}