/*********************ajax操作工具js*********************/
/**
 * 开启加载层
 * @return
 */
var path_url = "http://192.168.31.94:8080/KnowYun_Web/";
var pic_url = "http://192.168.31.94:8080/";
function loadingDiv() {
	if(isUndefinedAndEmpty($('#imgUpload').val())){
		return ;
	}
	//判断加载层是否存在
	if($("#dialodIndex").length > 0) {
		$("#dialodIndex").show()
		return;
	}
	var divId = 'loadingDiv';
	var styleCss = 'position:absolute;padding-top:70%;left:45%;z-index:999;';
	//操作遮盖曾
	var dialog_maskCss = 'position:fixed;left:0;top:0;right:0;bottom:0;background:#fefefe;filter:alpha(opacity=1);opacity:.1;display:block;overflow-x:hidden;overflow-y:auto;z-index:1000;';
	//在页面中创造一个新的DIV并用户显示
	var divHtml = '<div id="dialodIndex" onclick="closeLoadingDiv()" title="点击即消失" style="' + dialog_maskCss + '"><div id="' + divId + '" name="loadingDiv" style="' + styleCss + '">&nbsp;&nbsp;<img src="'+$("#imgUpload").val()+'" style="width: 30px;height: 30px;"/></div></div>';
	//拼加在body中
	$("body").append(divHtml);
}

/**
 * 关闭加载层
 * @return
 */
function closeLoadingDiv() {
	$("#dialodIndex").remove();
}


// ajax调用结束时调用
$(document).ajaxStop(function() {
	closeLoadingDiv();
});


function getAjaxData(jsonAjax) {
	//loadingDiv();
	if(jsonAjax.is_login=="n" && isUndefinedAndEmpty(getUserLocalStorage())){
		window.parent.location='../../login/login.html';
		return ;
	}
	var jsonData = jsonAjax.jsonData;
	var json = {"mapStr":jsonToStr(jsonData)};
	$.ajax( {
    	type : "post",
    	url : path_url + jsonAjax.url,
    	cache : true,
    	async : true,
    	data : json,
    	dataType : "html",
    	success : function(data) {
    		if(!isUndefinedAndEmpty(jsonAjax.methodName)){ //如果有回调方法就进行回调
    			var jsonObj = editJson(jsonAjax, "data", data);
    			doCallback(eval(jsonAjax.methodName),[jsonObj]);
    		}
    	},
    	error:function(data){ 
    		mui.toast("网络错误,请检查网络状态!");
    		closeLoadingDiv();
        }
    });
}


/**
 * 这个方法做了一些操作、然后调用回调函数
 * @param fn 当前需要操作的对象
 * @param args 当前操作的参数
 */
function doCallback(fn, args) {
	fn.apply(this, args);
}

/**
 * ajax请求之后的回执处理
 * @param ajaxData  回执数据
 * @return boolean 正确返回true  错误返回false
 */
function ajaxReceipt(ajaxData) {
	if(ajaxData.indexOf("error") != -1) { //错误信息输出
		return false;
	}
	return true;
}

/**
 * 手机查询回调 公共操作
 * @param jsonObj
 */
function openPage_back(jsonObj) {
	$("#" + jsonObj.targetContainer).html(jsonObj.data);
	if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
		doCallback(eval(jsonObj.overMethodName), [jsonObj]);
	}
	
}


/**
 * 所有操作完成弹出操作方法
 * @param jsonObj
 */
function updateOver_back(jsonObj) {
	if(ajaxReceipt(jsonObj.data)) {
		var jsonInfo = strToJson(jsonObj.data);
		if(jsonInfo.code == "fail") { //失败标识符
			mui.toast(jsonInfo.info);
		} else {
			if(isUndefinedAndEmpty(jsonInfo.info)) {
				if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
					window.location = jsonObj.brck_url;
				} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
					doCallback(eval(jsonObj.overMethodName), [jsonObj]);
				}
			} else {
				mui.alert(jsonInfo.info, '提示', function() {
					if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
						window.location = jsonObj.brck_url;
					} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
						doCallback(eval(jsonObj.overMethodName), [jsonObj]);
					}
				});
			}
		}
	} else {
		mui.toast('操作失败');
	}
}

/**
 * 所有操作完成弹出操作方法 弹出confirm对话框
 * @param jsonObj
 */
function updateOver_confirm_back(jsonObj) {
	if(ajaxReceipt(jsonObj.data)) {
		var jsonInfo = strToJson(jsonObj.data);
		if(jsonInfo.code == "fail") { //失败标识符
			mui.toast(jsonInfo.info);
		} else {
			var btnArray = ['否', '是'];
			if(isUndefinedAndEmpty(jsonInfo.info)) {
				mui.confirm(jsonInfo.info, '确认', btnArray, function(e) {
					if(e.index == 1) {
						if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
							window.location = jsonObj.brck_url;
						} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
							doCallback(eval(jsonObj.overMethodName), [jsonObj]);
						}
					}
				})
			} else {
				mui.confirm(jsonInfo.info, '确认', btnArray, function(e) {
					if(e.index == 1) {
						if(!isUndefinedAndEmpty(jsonObj.brck_url)) {
							window.location = jsonObj.brck_url;
						} else if(!isUndefinedAndEmpty(jsonObj.overMethodName)) { //如果有回调方法就进行回调
							doCallback(eval(jsonObj.overMethodName), [jsonObj]);
						}
					}
				})
			}
		}
	} else {
		mui.toast('操作失败');
	}
}

 
/**
 * 上传
 * 
 * @param index
 */
function uploadImg(jsonObj) {
	var jsonAjax = {
		'url' : jsonObj.url,
		'fileElementId' : jsonObj.fileElementId,
		'imgUpload':jsonObj.imgUpload,
		'jsonData' : jsonObj.jsonData,
		'methodName' : 'uploadImg_back',
		'overMethodName':jsonObj.overMethodName
	}
	getAjaxUpdateData(jsonAjax);
}


/**
 * 上传回调
 * 
 * @param jsonObj
 */
function uploadImg_back(jsonObj) {
	if (ajaxReceipt(jsonObj.data)) {
		if(!isUndefinedAndEmpty(jsonObj.imgUpload)){
			$("#"+jsonObj.imgUpload).attr("src",jsonObj.data);
			$("#"+jsonObj.imgUpload).attr("isLoad","y");
		}
		if(!isUndefinedAndEmpty(jsonObj.overMethodName)){ //如果有回调方法就进行回调
			doCallback(eval(jsonObj.overMethodName),[jsonObj]);
		}
	} else {
		mui.alert('上传失败');
	}
}


/**
 * 文件上传使用ajax
 * @param jsonAjax
 */
function getAjaxUpdateData(jsonAjax) {
	$.ajaxFileUpload( {
		url : path_url + jsonAjax.url, // 用于文件上传的服务器端请求地址
		secureuri : false, // 一般设置为false
		fileElementId : jsonAjax.fileElementId, // 文件上传空间的id属性input type="file"
		data : jsonAjax.jsonData, //json格式参数
		dataType : 'text', // 返回值类型 一般设置为json
		success : function(data, status){// 服务器成功响应处理函数
			if(!isUndefinedAndEmpty(jsonAjax.methodName)){ //如果有回调方法就进行回调
				var jsonObj = editJson(jsonAjax, "data", data);
				doCallback(eval(jsonAjax.methodName),[jsonObj]);
			}
		},
		error : function(data, status, e){// 服务器响应失败处理函数
//			alert("文件上传出错了!");
			closeLoadingDiv();
		}
	});
}