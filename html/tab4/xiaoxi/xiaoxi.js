function back(){
	mui.back();
}

function goToWeichakanxiaoxi(){
	mui.openWindow({
		url: 'weichakanxiaoxi/weichakanxiaoxi.html',
		id: 'weichakanxiaoxi',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}


 


function goToYiduxiaoxi(){
	mui.openWindow({
		url: 'yiduxiaoxi/yiduxiaoxi.html',
		id: 'yiduxiaoxi',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}
