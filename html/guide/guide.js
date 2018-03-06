function goToLogin() {
	mui.openWindow({
		url: '../login/login.html',
		id: 'login',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}

function goToRegister() {
	mui.openWindow({
		url: '../login/register/register.html',
		id: 'register',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}