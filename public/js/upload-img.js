// Upload new post
let srcImage = document.getElementById('source-img');
let inputImage = document.getElementById('image');

let srcImageEdit = document.getElementById('source-edit-img');
let inputImageEdit = document.getElementById('edit-image');

try {
    inputImage.onchange = function(){
        srcImage.src = URL.createObjectURL(inputImage.files[0]);
    }
} catch (error) {
    console.log("New image cant be uploaded");
}

// Edit user profile
try {
    inputImageEdit.onchange = function(){
        srcImageEdit.src = URL.createObjectURL(inputImageEdit.files[0]);
    }
} catch (error) {
    console.log("Cannot update new PFP")
}