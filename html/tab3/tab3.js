/**
 * 
 */
function goToSearch() {
	mui.openWindow({
		url: 'bumen/bumen.html',
		id: 'bumen',
		extras: { //这是要传的数据
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		}
	});
}