let srcImage = document.getElementById('source-img');
let inputImage = document.getElementById('image');

inputImage.onchange = function(){
    srcImage.src = URL.createObjectURL(inputImage.files[0]);
}