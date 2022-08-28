function switch_themes(checked){
	// Light Mode => True
  	// Dark Mode => False

  	if(checked){
  		document.body.classList.remove("body-dark");
  		document.body.classList.add("body-light");
  	}else{
  		document.body.classList.remove("body-light");
  		document.body.classList.add("body-dark");
  	}
}