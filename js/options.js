var username = localStorage.username || "username";
var password = localStorage.password || "";
document.getElementById('username').value = username;
document.getElementById('password').value= password;
document.getElementById('save').onclick = function(){
	localStorage.username = document.getElementById('username').value;
	localStorage.password = document.getElementById('password').value;
}