let startID = 0
const recordsEndpoint = "/syscraft/"
const workRecordCarousel = `
	<div class="carousel-item">
     	<div class="row g-3 row-vertical-center">
			{0}
		</div>
    </div>
`
const workRecordCarouselCol = `
	<div class="col-sm-6 col-lg-12">
		<button class="button-work box work-wrapper" onclick="getRecordDetails('{1}', '{0}')">
			<h5>{0}</h5>
			<img src="/freelance_static/{1}/banner.png">
			<p>{2}</p>
		</button>
	</div>
`

const formatString = (string, ...args) => {
  return string.replaceAll(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === "undefined" ? match : args[index];
  });
}

const requestErrorDisplay = async (res) => {
	console.log("Couldn't complete the request")
	console.log(res.status)
	console.log(await res.json())
}

const getRecords = async (idx, firstLoad=false) => {
	let res = await fetch(`${recordsEndpoint}${idx}`)

	if(res.ok){
		res = await res.json()

		const container = document.querySelector("#record-display")
		const fields = res.fields.map( field => {
			return formatString(workRecordCarouselCol, field.title, field.folder, field.doa)
		})
		const html = formatString(workRecordCarousel, fields.join("\n"))
		container.innerHTML += html

		startID = res.nextIDX
		if(startID == -1){
			document.querySelector(".load_more_wrapper").style.display = "none"
		}

		document.querySelector(".carousel-control-next").click()
		if(firstLoad){
			document.querySelector("#temp_item").remove()
		}

	}else{
		requestErrorDisplay(res)
	}
}

const getRecordDetails = async (folder, title) => {
	console.log("huh")

	let res = await fetch(`${recordsEndpoint}record/${folder}`)
	if(res.ok){
		res = await res.json()
		const recordDisplay = document.querySelector(".record-extend-c")

		recordDisplay.querySelector("h2").innerHTML = title
		recordDisplay.querySelector("p").innerHTML = res.description
		if(res.tech.length > 0){
			recordDisplay.querySelector("#workTechS").innerHTML = "Technologies:"
			recordDisplay.querySelector("#workTech").innerHTML = res.tech.map( t => {return `<li>${t}</li>`}).join("")
		}
		if(res.links.length > 0){
			recordDisplay.querySelector("#workLnksS").innerHTML = "Links:"
			recordDisplay.querySelector("#workLnks").innerHTML = res.links.map( lnk => {return `<a href="${lnk[0]}" target="_blank">${lnk[1]}</a>`}).join("")
		}else{
			recordDisplay.querySelector("#workLnksS").innerHTML = ""
			recordDisplay.querySelector("#workLnks").innerHTML = ""
		}
	}else{
		console.log("failed")
		requestErrorDisplay(res)
	}
}

getRecords(startID, true)
document.querySelector(".load_more_wrapper").querySelector("button").addEventListener("click", e => {
	getRecords(startID)
})