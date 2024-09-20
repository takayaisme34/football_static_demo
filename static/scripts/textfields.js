
function adjust_textfield_height(textfieldElement){
    textfieldElement.style.height = "";
    textfieldElement.style.height = textfieldElement.scrollHeight + "px"
}

const textfieldEditors = document.getElementsByClassName("textfieldEditor");
for (const editor of textfieldEditors){
    adjust_textfield_height(editor)
}
