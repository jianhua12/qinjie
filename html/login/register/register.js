//返回
function back() {
	mui.back();
}
//服务条例
function goToAggrement() {
	mui.openWindow({
		url: 'aggrement/aggrement.html',
		id: 'aggrement',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}

//判断手机号是否注册
function postIsRegister() {
	var user_phone = document.getElementById("id_phone").value;

	if(isUndefinedAndEmpty(user_phone) || !validateElement("mobile", user_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	}

	var jsonObj = {
		"user_phone": user_phone
	}

	var jsonAjax = {
		"url": "h5_register_isExistPhone.html",
		"jsonData": jsonObj,
		"methodName": "h5_register_isExistPhone"
	};
	getAjaxData(jsonAjax);

}

/**
 * 手机号获取验证码回调
 * @param {Object} jsonObj
 */
function h5_register_isExistPhone(jsonObj) {
	console.log(jsonObj.data);
	var data = strToJson(jsonObj.data);
	if(data.code == "success") { //判断是否注册
		postGetCode();
	} else { //获取失败
		// 显示获取验证码失败的原因
		mui.toast(data.info);
	}
}

//获取验证码
function postGetCode() {
	//得到手机号编辑框内容
	var user_phone = document.getElementById("id_phone").value;

	if(isUndefinedAndEmpty(user_phone) || !validateElement("mobile", user_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	}

	var jsonObj = {
		"user_phone": user_phone
	}

	var jsonAjax = {
		"url": "h5_register_sengCode.html",
		"jsonData": jsonObj,
		"methodName": "h5_register_sengCode"
	};
	getAjaxData(jsonAjax);

}

/**
 * 手机号获取验证码回调
 * @param {Object} jsonObj
 */
function h5_register_sengCode(jsonObj) {
	console.log(jsonObj.data);
	var data = strToJson(jsonObj.data);

	if(data.code == "success") { //获取验证成功，开始倒计时
		sendCode();
	} else { //获取失败
		// 显示获取验证码失败的原因
		mui.toast(data.msg);
	}
}

var clock = '';
var nums = 60;
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
		nums = 60; //重置时间
	}
}

//注册
function postRegister() {
	//判断用户是否同意服务条例
	var isAgree = document.getElementById("id_aggrement").checked;
	if(!isAgree) {
		//弹出必须勾选服务条例
		mui.toast("必须勾选服务条例");
	}
	//TODO 请求服务器
	//得到手机号编辑框内容
	var phone = document.getElementById("id_phone").value;
	var code = document.getElementById("id_code").value;
	var password = document.getElementById("id_password").value;
	var password_again = document.getElementById("id_password_again").value;
	if(password != password_again) {
		mui.toast("两次密码不一致");
		return;
	}

	if(isUndefinedAndEmpty(phone)) {
		mui.toast('手机号码不能为空');
		return;
	}

	if(isUndefinedAndEmpty(code)) {
		mui.toast('验证码不能为空');
		return;
	}

	if(isUndefinedAndEmpty(password)) {
		mui.toast('密码不能为空');
		return;
	}

	var jsonObj = {
		"user_phone": phone,
		"code": code,
		"user_paw": password
	}

	var jsonAjax = {
		"url": "h5_register_addData.html",
		"jsonData": jsonObj,
		"methodName": "h5_register_addData"
	};
	getAjaxData(jsonAjax);

}

/**
 * 手机号+验证码+密码注册回调
 * @param {Object} jsonObj
 */
function h5_register_addData(jsonObj) {
	console.log(jsonObj.data);
	var data = strToJson(jsonObj.data);

	if(data.code == "success") { //注册成功
		mui.back();
		mui.toast("注册成功");
	} else { //注册失败
		//弹出注册失败的原因
		mui.toast(data.info);
	}

}

function goToMain() {
	mui.openWindow({
		url: '../login.html',
		id: 'login',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}