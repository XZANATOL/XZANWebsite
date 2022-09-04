async function copy_to_clip(text){
    await navigator.clipboard.writeText(text)
}

function switch_popup(id){
    let popup = document.getElementById(id)
    popup.classList.toggle("show")
}