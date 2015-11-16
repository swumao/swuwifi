/* global dorm */
/* global wifi */
wifi = new Swuwifi(1);
dorm = new Swuwifi(2);	// swu-wifi和wifi-dorm的双重尝试，未来考虑提供切换给用户
document.getElementById('login').onclick = function(){
	wifi.login();
	dorm.login();
}

document.getElementById('logout').onclick = function(){
	wifi.logout();
	dorm.logout();
}

document.getElementById('forcelogout').onclick = function(){
	wifi.forcelogout();
}