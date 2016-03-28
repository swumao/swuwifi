var wifi = new Swuwifi(2);
var user = document.getElementById('username');
var pass = document.getElementById('password');
var result = document.getElementById('result');
user.value = wifi.getUsername();
pass.value = wifi.getPassword();
document.getElementById('save').onclick = function(){
	wifi.setUsername(user.value);
	wifi.setPassword(pass.value);
	wifi.save();
	result.innerHTML = "保存成功！";
}
