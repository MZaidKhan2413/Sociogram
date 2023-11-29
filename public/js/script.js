const upload = document.getElementById("upload-box");
const create = document.getElementById('create');
const cancel = document.getElementById('cancel-btn');

create.addEventListener("click", ()=>{
    upload.style.display = "block";
});

cancel.addEventListener("click", ()=>{
    upload.style.display = "none";
});