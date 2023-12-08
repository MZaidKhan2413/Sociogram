let themeBtn = document.getElementById('switch-theme');
let themeBtnSm = document.getElementById('switch-theme-sm');

const changeTheme = () =>{
    document.body.classList.toggle('light-theme');
}

themeBtn.addEventListener("click", changeTheme);
themeBtnSm.addEventListener("click", changeTheme);