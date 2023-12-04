const upload_box = document.getElementById("upload-box");
const create = document.getElementById('create');
const createSM = document.getElementById('create-sm');
const cancel = document.getElementById('cancel-btn');
const upload = document.getElementById('upload-btn');

const btnEvents = () =>{
    upload_box.style.opacity = "0";
    upload_box.style.display = "none";
}

const showBox = () =>{
    upload_box.style.opacity = "1";
    upload_box.style.display = "block";
}

create.addEventListener("click", showBox);

createSM.addEventListener("click", showBox)

upload.addEventListener("click", btnEvents)

cancel.addEventListener("click", btnEvents);