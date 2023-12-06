let id_old = {
    eE_id: false,
    wE_id: false,
    v_id: false
}
document.addEventListener("click", (event) => {
    const ids = ["eE_id", "wE_id", "v_id"]

    ids.forEach( id => {
        const ele = document.querySelector(`#${id}`)
        if (ele.classList.contains("show") && !ele.contains(event.target)){
            if(!id_old[id]){
                id_old[id] = true
            }else{
                ele.classList.toggle("show")
                id_old[id] = false
            }
        }
    })
})

async function copy_to_clip(text){
    await navigator.clipboard.writeText(text)
}

function switch_popup(id){
    let popup = document.getElementById(id)
    popup.classList.toggle("show")
}
