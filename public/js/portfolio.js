let eE_id_old = false
let wE_id_old = false
document.addEventListener("click", (event) => {
    const eE_id = document.getElementById("eE_id")
    const wE_id = document.getElementById("wE_id")
    if (eE_id.classList.contains("show") && !eE_id.contains(event.target)){
            if(!eE_id_old){
                eE_id_old = true
            }else{
                eE_id.classList.toggle("show")
                eE_id_old = false
            }
    }
    if (wE_id.classList.contains("show") && !wE_id.contains(event.target)){
            if(!wE_id_old){
                wE_id_old = true
            }else{
                wE_id.classList.toggle("show")
                wE_id_old = false
            }
    }
})

async function copy_to_clip(text){
    await navigator.clipboard.writeText(text)
}

function switch_popup(id){
    let popup = document.getElementById(id)
    popup.classList.toggle("show")
}