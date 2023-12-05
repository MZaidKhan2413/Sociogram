const showFollowing = document.getElementById('showFollowing');
const showFollowers = document.getElementById('showFollowers');

const followerDiv = document.getElementById('showFollowers-Div');
const followingDiv = document.getElementById('showFollowing-Div');

const show = (mainDiv, anotherDiv)=>{
    mainDiv.style.display = mainDiv.style.display === "block" ? "none" : "block";
    anotherDiv.style.display = "none";
}

showFollowers.addEventListener("click", function(){
    show(followerDiv, followingDiv);
});
showFollowing.addEventListener("click", function(){
    show(followingDiv, followerDiv);
});
