module.exports = function(server, db){

	server.post(`/${process.env.ADMIN_URL}`, async (request, response) => {
		
		let Get = async (body) => {
				/*
				{
					"username": <user>,
					"password": <pass>, 
					"req": <char:req_type>, 
					"collection": <collection>, 
					"path": <list:path>
				}
				*/
				let path, query = await db.collection(body.collection)
				try{
					path = JSON.parse(body.path)
					query = await query.get(path[0])
					path.shift()
				}catch{
					path = []
					query = query.list()
				}
				

				for(p of path){
					try{
						query = query[p]
					}catch{
						return {"Result": "Wrong path!"}
					}
				}
				return query
			}


		let Change = async (body) => {
				/*
				{
					"username": <user>,
					"password": <pass>, 
					"req": <char:req_type>, 
					"collection": <collection>, 
					"path": <list:path>,
					"new_val" <val>
				}
				*/
				let path, old_val, new_val, query = await db.collection(body.collection)
				try{
					path = JSON.parse(body.path)
					new_val = JSON.parse(body.new_val)
				}catch{
					return "<path> & <new_val> are required in Change request!"
				}

				try{
					old_val = (await query.get(path[0])).props
				}catch{
					return {"Result": "Wrong path!"}
				}

				if(body.req == "C"){
					for (key of Object.keys(new_val)){
						old_val[key] = new_val[key]
					}
				}else{
					for (key of Object.keys(new_val)){
						old_val[key].push(new_val[key])
					}
				}
				delete old_val.created
				delete old_val.updated

				await query.set(path[0], old_val)
				return old_val
			}


		const body = request.body
		if (body.username == process.env.ADMIN_USER && body.password == process.env.ADMIN_PASS){

			if(body.req == "G"){ // Get
				let res = await Get(body)
				return response.send(res)

			}else if(body.req == "C"){ // Change
				let res = await Change(body)
				return response.send(res)

			}else if(body.req == "A"){ // Add
				let res = await Change(body)
				return response.send(res)
			}

		}

		return response.send("Authentication Failed!")
	})

}