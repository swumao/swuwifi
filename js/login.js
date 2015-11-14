var result = document.getElementById('result');
var username = localStorage.username;
var password = localStorage.password;
result.innerHTML = "hi "+username;
function post(url, PARAMS){
	var temp = document.createElement("form");
	temp.action = url;
	temp.method = "post";
	temp.style.display = "none";
	for(var x in PARAMS){
		var opt = document.createElement('textarea');
		opt.name = x;
		opt.value = PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}

function post1(url, PARAMS, title){
	var postData = PARAMS;
 
	postData = (function(obj){ // 转成post需要的字符串.
		var str = "";
	
		for(var prop in obj){
			str += prop + "=" + obj[prop] + "&"
		}
		return str;
	})(postData);
 
	var xhr = new XMLHttpRequest();
 
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var text = XMLHttpReq.responseText;
	
				result.innerHTML = "hi "+username + title + "ok";
			}
		}
	};
	xhr.send(postData);
}

document.getElementById('login').onclick = function(){
	post1("http://202.202.96.59:9040/login/login1.jsp", {
		username: username,
		password: password,
		if_login: "Y",
		B2: "登录(Login)"
	}, "登陆");
}

document.getElementById('logout').onclick = function(){
	post1("http://202.202.96.59:9040/login/logout1.jsp", {
		username: username,
		password: password,
		if_login: "Y",
		B2: "退出(Logout)"
	}, "退出");
	post1("http://service.swu.edu.cn/fee/remote_logout2.jsp",{
		username: username,
		password: password,
		B1: "确认"
	}, "退出");
}