function back(){
	mui.back();
}
function goToXiaoxiDetail(){
	mui.openWindow({
		url: 'XiaoxiDetail/XiaoxiDetail.html',
		id: 'XiaoxiDetail',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}
