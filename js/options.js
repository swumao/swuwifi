// var username = localStorage.username || "username";
// var password = localStorage.password || "";
// document.getElementById('username').value = username;
// document.getElementById('password').value= password;
// document.getElementById('save').onclick = function(){
// 	localStorage.username = document.getElementById('username').value;
// 	localStorage.password = document.getElementById('password').value;
// 	document.getElementById('result').innerHTML = "保存成功！";
// }
var wifi = new Swuwifi(2);
var user = document.getElementById('username');
var pass = document.getElementById('password');
var result = document.getElementById('result');
user.value = wifi.getUsername();
pass.value = wifi.getPassword();
document.getElementById('save').onclick = function(){
	wifi.setUsername(user.value);
	wifi.setPassword(pass.value);
	result.innerHTML = "保存成功！";
}