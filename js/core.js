/* global Swuwifi */
(function(){
	var username = "";
	var password = "password";
	var ip = "0.0.0.0";
	var nettype = 1;	// 1表示swuwifi，2表示wifidorm
	Swuwifi = function(t){
		this.nettype = t;
		this.load();
	};
	Swuwifi.prototype = {
		constructor:Swuwifi,
		setUsername:function(user){
			this.username = user;
		},
		setPassword:function(passwd){
			this.password = passwd;
		},
		getUsername:function(){
			return this.username;
		},
		getPassword:function(){
			return this.password;
		},
		load:function(){	// 从localStorage中加载用户名和密码
			this.username = localStorage.username;
			this.password = localStorage.password;
		},
		save:function(){	// 将当前的用户名和密码保存到localStorage中
			localStorage.username = this.username;
			localStorage.password = this.password;
		},
		login:function(){
			switch(this.nettype){
				case 1:
					this.post("http://202.202.96.59:9040/login/login1.jsp", {
						username: this.username,
						password: this.password,
						if_login: "Y",
						B2: "登录(Login)"
					});
					break;
				case 2:
					this.post("http://222.198.120.8:8080/loginPhoneServlet", {
						username: this.username,
						password: this.password,
						loginTime: new Date().getTime()
					});
					break;
				default:
					console.log("Not Support Network!"+this.nettype);
					break;
			};
		},
		logout:function(){
			switch(this.nettype){
				case 1:
					this.post("http://202.202.96.59:9040/login/logout1.jsp", {
						username: this.username,
						password: this.password,
						if_login: "Y",
						B2: "退出(Logout)"
					});
					break;
				case 2:
					this.post("http://222.198.120.8:8080/logoutPhoneServlet", {
						username: this.username,
						password: this.password,
						userip: this.ip
					});
					break;
				default:
					this.post("http://service.swu.edu.cn/fee/remote_logout2.jsp", {
						username: username,
						password: password,
						B1: "确认"
					});
					break;
			}
		},
		post:function(url, params){
			var postData = params;
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
						//result.innerText = text;
						if(this.nettype == 2){
							var ipinput = text.getElementById('form1').getElementsByTagName('input');
							this.ip = ipinput[2].value;
						}
						result.innerHTML = "hi "+username + "操作ok";
					}
				}
			};
			xhr.send(postData);
		}
	};
})();