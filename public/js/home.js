async function copy_to_clip(text){
    await navigator.clipboard.writeText(text)
}