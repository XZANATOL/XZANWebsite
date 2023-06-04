function mainResize(){
	const headerHeight = document.querySelector("header").offsetHeight
	let main = document.querySelector("main")
	const height = `${window.innerHeight - headerHeight - 20}`
	main.setAttribute("style", `height:${height}px;max-Height:${height}px`)
}
window.addEventListener("resize", mainResize())
mainResize()