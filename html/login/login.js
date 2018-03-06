//返回按钮
function back() {
	mui.back();
}

//跳转至注册界面
function goToRegister() {
	console.log("跳转至注册界面");

	mui.openWindow({
		url: 'register/register.html',
		id: '',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});

}

//忘记密码
function goToForgetPassword() {
	mui.openWindow({
		url: 'forgetPassword/forgetPassword.html',
		id: 'forgetPassword',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	})
}
//修改手机地区
function changePhoneArea() {
	mui.openWindow({
		url: 'changePhoneArea/changePhoneArea.html',
		id: 'changePhoneArea',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	})
}

//获取验证码
function postGetCode() {
	//得到手机号编辑框内容
	var user_phone = document.getElementById("id_phone").value;

	if(isUndefinedAndEmpty(user_phone) || !validateElement("mobile", user_phone)) {
		alert('请输入有效的手机号码！');
		return;
	}

	var jsonObj = {
		"type": "0",
		"content": {
			"user_phone": user_phone
		}
	}

	var jsonAjax = {
		"url": "/zkLoginServlet",
		"jsonData": {
			"mapStr": jsonToStr(jsonObj)
		},
		"methodName": "isExistPhone_back"
	};
	getAjaxData(jsonAjax);

}

/**
 * 手机号获取验证码回调
 * @param {Object} jsonObj
 */
function isExistPhone_back(jsonObj) {
	var data = strToJson(jsonObj.data);
	if(data.type == 1) { //获取验证成功，开始倒计时
		alert(data.msg);
		sendCode();

	} else { //获取失败
		// 显示获取验证码失败的原因
		alert(data.msg);
	}
}

var clock = '';
var nums = 30;
var btn;

function sendCode() {
	btn = document.getElementById("id_getcode");
	btn.disabled = true; //将按钮置为不可点击
	btn.value = nums + '秒后可重新获取';
	clock = setInterval(doLoop, 1000); //一秒执行一次
}

/**
 * 倒计时
 */
function doLoop() {
	nums--;
	if(nums > 0) {
		btn.value = nums + '秒后可重新获取';
	} else {
		clearInterval(clock); //清除js定时器
		btn.disabled = false;
		btn.value = '点击发送验证码';
		nums = 30; //重置时间
	}
}

//登陆按钮
function postGoToLogin1() {
	//手机号+密码登录

	//得到手机号编辑框内容
	var phone = document.getElementById("id_phone_1").value;
	//得到密码编辑框内容
	var password = document.getElementById("id_password_1").value;

	if(isUndefinedAndEmpty(phone)) {
		mui.toast('手机号码不能为空');
		return;
	}

	if(isUndefinedAndEmpty(password)) {
		mui.toast('密码不能为空');
		return;
	}

	// 请求服务器
	var jsonObj = {
		"user_phone": phone,
		"user_paw": password
	}

	var jsonAjax = {
		"url": "h5_login_validate.html",
		"jsonData": jsonObj,
		"methodName": "listenerPasswordLogin"
	};
	getAjaxData(jsonAjax);

}

function postGoToLogin2() {
	//手机号+验证码登陆
	//得到手机号编辑框内容
	var phone = document.getElementById("id_phone_2").value;
	//得到验证码编辑框内容
	var code = document.getElementById("id_code_2").value;
	// 请求服务器

	var jsonObj = {
		"type": "4",
		"content": {
			"user_phone": phone,
			"code": code
		}
	}

	var jsonAjax = {
		"url": "/zkLoginServlet",
		"jsonData": {
			"mapStr": jsonToStr(jsonObj)
		},
		"methodName": "updateOver_back",
		"overMethodName": "listenerPasswordLogin"
	};
	getAjaxData(jsonAjax);
}
/**
 * 密码登陆回调
 * @param {Object} jsonObj
 */
function listenerPasswordLogin(jsonObj) {
	console.log(jsonObj.data);

	var data = strToJson(jsonObj.data);
	if(data.code == "success") { //注册成功
		mui.back();
		mui.toast("登陆成功");

		var data = strToJson(jsonObj.data);

		//保存用户信息在本地
		console.log(data.data);
		setUserLocalStorage(data.data);
		//			alert(getUserLocalStorage().gxsj)

		//	var content = strToJson(data.data);
		//	localStorage.setItem("gxsj", content.gxsj);
		//	localStorage.setItem("bz", content.bz);
		//	localStorage.setItem("lrsj", content.lrsj);
		//	localStorage.setItem("zt", content.zt);
		//	localStorage.setItem("user_id", content.user_id);
		//	localStorage.setItem("user_name", content.user_name);
		//	localStorage.setItem("user_img", content.user_img);
		//	localStorage.setItem("user_phone", content.user_phone);
		//	localStorage.setItem("user_wx_img", content.user_wx_img);
		//	localStorage.setItem("user_blog", content.user_blog);
		//	localStorage.setItem("user_sina", content.user_sina);
		//	localStorage.setItem("user_sign", content.user_sign);
		//	localStorage.setItem("user_openid", content.user_openid);
		var main = plus.webview.currentWebview().opener(); //获取父页面A对象
		mui.fire(main, "pageflowrefresh"); //出发A页面的pageflowrefresh方法
		mui.back();
	} else { //注册失败
		//弹出注册失败的原因
		mui.toast(data.info);
	}

}

function goToMain() {
	mui.openWindow({ 
		url: '../index.html',
		id: 'index',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	})
} 