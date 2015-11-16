/* global Swuwifi */
(function(){
	var username = "";
	var password = "password";
	var ip = "0.0.0.0";
	var status = 0;
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
		forcelogout:function(){
			this.post("http://service.swu.edu.cn/fee/remote_logout2.jsp", {
				username: this.username,
				password: this.password,
				B1: "确认"
			});
		},
		setStatus:function(){
			if(this.status==1){
				document.getElementById('status').style.color = "green";
			}else{
				document.getElementById('status').style.color = "red";
			}
		},
		check:function(text){
			switch(this.nettype){
				case 1:
					if(text.indexOf("通过登录审核")!=-1){	// 通过校园网网页登陆成功
						this.status = 1;
					}
					if(text.indexOf("退出请求已被接受")!=-1){	// 校园网网页退出成功
						this.status = 0;
					}
				case 2:
					if(text.indexOf("登陆成功")!=-1){	// 寝室网页登陆成功
						this.status = 1;
					}
					if(text.indexOf("畅通无限")!=-1){	// 寝室网页退出登陆
						this.status = 0;
					}
				default:
					
					break;
			}
			if(text.indexOf("成功退出")!=-1 || text.indexOf("<form name=\"remote_logout2\">")!=-1){	// 信息中心退出成功
				this.status = 0;
			}
			console.log(text);
			this.setStatus();
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
			var wifi = this;
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
						wifi.check(text);
					}
				}
			};
			xhr.send(postData);
		},
	};
})();