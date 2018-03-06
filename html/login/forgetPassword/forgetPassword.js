//返回
function back() {
	mui.back();
}

//修改手机地区
function changePhoneArea() {
	mui.openWindow({
		url: '../changePhoneArea/changePhoneArea.html',
		id: 'changePhoneArea',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}

//获取验证码--判断手机号是否注册
function postGetCode() {
	//得到手机号编辑框内容
	var user_phone = document.getElementById("id_phone").value;

	if(isUndefinedAndEmpty(user_phone) || !validateElement("mobile", user_phone)) {
		mui.toast('请输入有效的手机号码！');
		return;
	}

	var jsonObj = {
		"phone": user_phone
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
/**
 * 填写手机号码  调用
 * @param jsonObj
 */
function h5_register_isExistPhone(jsonObj) {
	console.log(jsonObj.data);
	var data = strToJson(jsonObj.data);
	if(data.code == "success") { //判断是否注册
		sendCode(); 
	} else { //获取失败
		 mui.toast("手机号码不存在");
	}
}

/**
 * 发送验证码
 * @return
 */
function sendCode() {
	var user_phone = $('#id_phone').val();
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
 * 发送验证码回调
 * @param jsonObj
 */
function h5_register_sengCode(jsonObj) {
	console.log(jsonObj.data);
	var data = strToJson(jsonObj.data);

	if(data.code == "success") { //获取验证成功，开始倒计时
		daojishi();
	} else { //获取失败
		// 显示获取验证码失败的原因
		mui.toast(data.msg);
	}

}

var clock = '';
var nums = 30;
var btn;

function daojishi() {
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

//注册
function postRegister() {
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

	getAjaxData(jsonAjax);
	var jsonObj = {
		"code": code,
		"user_paw": password,
		"user_phone": phone,
	}
	var jsonAjax = {
		"url": "h5_changePaw_updateData.html",
		"jsonData": {
			"mapStr": jsonToStr(jsonObj)
		},
		"methodName": "changePaw_back"
	};
	getAjaxData(jsonAjax);
}

/**
 * 手机号+验证码+密码注册回调
 * @param {Object} jsonObj
 */

function changePaw_back(jsonObj){
	var jsonInfo = strToJson(jsonObj.data);
	mui.toast(jsonInfo.info);
	if(jsonInfo.code!='fail'){
		setTimeout(function(){
			mui.back();
		},1500)
		
	}
}