const fs = require("fs")
const showdown = require("showdown")

module.exports = function(server){

	server.get("/blog", (request, response) => {
		const years = fs.readdirSync(`${__dirname}/../views/blog/articles`).sort().reverse()
		const articles = years.map( year => {
			const dir = fs.readdirSync(`${__dirname}/../views/blog/articles/${year}`)
			return [year, dir]
		})

		const context = {
			articles: articles,
			seo: {
				"title": "XZANBlog",
				"description": "DevLog for sharing my learning journey"
			}
		}
		return response.render("blog/index.ejs", context)
	})

	server.get("/blog/:year/:post_title", (request, response) => {
		let post;
		let meta;
		try{
			post = fs.readFileSync(
					`${__dirname}/../views/blog/articles/${request.params.year}/${request.params.post_title}/post.md`, 
					"utf-8"
				)
			meta = JSON.parse(
					fs.readFileSync(
						`${__dirname}/../views/blog/articles/${request.params.year}/${request.params.post_title}/meta.json`,
						"utf-8"
					)
				)

			showdown.extension('linksInNewTab', () => {
			  return [{
			    type: 'html',
			    regex: /(<a [^>]+?)(>.*<\/a>)/g,
			    replace: '$1 target="_blank"$2'
			  }];
			});
			let converter = new showdown.Converter({
			  extensions: ['linksInNewTab']
			})
			converter.setOption('tables', true)

			post = converter.makeHtml(post);
		}catch(err){
			post = []
			meta = []
		}

		const context = {
			post: post,
			meta: meta,
			seo: meta.seo
		}
		return response.render("blog/article.ejs", context)
	})

}