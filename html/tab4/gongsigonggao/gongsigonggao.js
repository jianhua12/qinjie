function back(){
	mui.back();
}

function goToGonggaoxiangqing(){
	mui.openWindow({
		url: 'goToGonggaoxiangqing/goToGonggaoxiangqing.html',
		id: 'goToGonggaoxiangqing',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}
