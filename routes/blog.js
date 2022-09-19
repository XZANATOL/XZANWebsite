const fs = require("fs")

module.exports = function(server){

	server.get("/blog", (request, response) => {
		const dir = fs.readdirSync(`${__dirname}/../views/blog-articles/`)
		const context = {
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
		return response.render("blog/index_cat.ejs", context)
	})


	server.get("/blog/:cat/:topic", (request, response) => {
		let dir;
		try{
			dir = fs.readdirSync(`${__dirname}/../views/blog-articles/${request.params.cat}/${request.params.topic}`)
		} catch{
			dir = []
		}
		const context = {
			"cat": request.params.cat,
			"topic": request.params.topic,
			"posts": dir
		}
		return response.render("blog/index_cat_topic.ejs", context)
	})


	server.get("/blog/:cat/:topic/:post", (request, response) => {
		const check = fs.existsSync(`${__dirname}/../views/blog-articles/${request.params.cat}/${request.params.topic}/${request.params.post}`)
		if(check){
			return response.render(`blog-articles/${request.params.cat}/${request.params.topic}/${request.params.post}`)
		}
		return response.render("404.ejs")
	})

}