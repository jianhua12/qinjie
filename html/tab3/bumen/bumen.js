function goToSearchResult(){
	mui.openWindow({
		url: '../../tab1/personalMessage/personalMessage.html',
		id: 'personalMessage',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}

function back(){
	mui.back();
}
