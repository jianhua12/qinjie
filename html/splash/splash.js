localStorage.setItem("isFirst", 1);

var countdown = 3;
settime();

/**
 * 倒计时
 */
function settime() {

	if(countdown == 0) {
		goToMain();
	} else {
		countdown--;
		setTimeout(function() {
			settime();
		}, 1000)
	}

}

function skip() {
	goToMain();
}

//跳转至主界面
function goToMain() {
	var data = isLogin();
	console.log(data);
	if(isLogin()) {

		mui.openWindow({
			url: '../index.html',
			id: 'index',
			extras: { //这是要传的数据
			},
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		});
	} else {

		mui.openWindow({
			url: '../guide/guide.html',
			id: 'guide',
			extras: { //这是要传的数据
			},
			waiting: {
				autoShow: false, //自动显示等待框，默认为true
			}
		});
	}
	
}

//跳转至登陆界面


