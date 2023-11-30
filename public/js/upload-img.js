// Upload new post
let srcImage = document.getElementById('source-img');
let inputImage = document.getElementById('image');

inputImage.onchange = function(){
    srcImage.src = URL.createObjectURL(inputImage.files[0]);
}

// Edit user profile
let srcImageEdit = document.getElementById('source-edit-img');
let inputImageEdit = document.getElementById('edit-image');

inputImageEdit.onchange = function(){
    srcImageEdit.src = URL.createObjectURL(inputImageEdit.files[0]);
}