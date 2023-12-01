const upload_box = document.getElementById("upload-box");
const create = document.getElementById('create');
const cancel = document.getElementById('cancel-btn');
const upload = document.getElementById('upload-btn');

const btnEvents = () =>{
    upload_box.style.display = "none";
    document.body.style.overflowY = "initial";
}

create.addEventListener("click", ()=>{
    upload_box.style.display = "block";
    document.body.style.overflowY = "hidden";
});

upload.addEventListener("click", btnEvents)

cancel.addEventListener("click", btnEvents);