const monthSelect = document.querySelector("#month")
const loader = document.querySelector(".loader-wrapper")
const docs = document.querySelector("#docs")

function monthUpdater(select){
	let http = new XMLHttpRequest()
	let endpoint = "/brag_doc/months"
	let params = {
		"year": select.value,
	}

	http.open("POST", endpoint, true)
	http.setRequestHeader("Content-type", "application/json")

	http.onreadystatechange = () => {
	    if(http.readyState == 4 && http.status == 200) {
	        let response = JSON.parse(http.responseText)
	        monthSelectUpdater(response)
	    }
	}

	http.send(JSON.stringify(params))
}


function monthSelectUpdater(months){
	monthSelect.innerHTML = `<option value="">Select Month</option>\n`
	months.forEach((month) => {
		monthSelect.innerHTML += `<option value="${month}">${month}</option>\n`
	})
}


function bragGrabber(form){
	docs.innerHTML = ""
	loader.classList.toggle("d-none")

	let http = new XMLHttpRequest()
	let endpoint = "/brag_doc"
	let params = {
		"year": form.year.value,
		"month": form.month.value
	}

	http.open("POST", endpoint, true)
	http.setRequestHeader("Content-type", "application/json")

	http.onreadystatechange = () => {
	    if(http.readyState == 4 && http.status == 200) {
	        let response = JSON.parse(http.responseText)
	        uiUpdater(response)
	    }
	}

	http.send(JSON.stringify(params))
}


function uiUpdater(brags){
	loader.classList.toggle("d-none")
	brags.forEach( (brag) => {
		let links_html = ""
		brag.links.forEach( (link) => {
			links_html += `<li><a href="${link[0]}" target="_blank">${link[1]}</a></li>\n`
		})

		docs.innerHTML += `
			<section class="col-xs-12 col-md-11">
				<div class="box">
					<h3>${brag.title}</h3>
					<p>
						${brag.description}	
					</p>
					<ul>
						${links_html}
					</ul>
				</div>
			</section>
		`
	})
}