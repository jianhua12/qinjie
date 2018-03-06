/**
 * 将用户数据存储到LocalStorage中.1
 * @param userJson
 */
function setUserLocalStorage(userJson) {
	localStorage.setItem("userJson", userJson);
}

/**
 * 从cookie中得到一条userjson 数据
 * @return json
 */
function getUserLocalStorage() {

	var userJson = localStorage.getItem("userJson");

	if(isUndefinedAndEmpty(userJson)) {

		userJson = "{}";

	}

	return strToJson(userJson);

}

//判断是否登录，没登陆则跳转至登录界面
function isLogin() {

	var uid = getUserLocalStorage().user_id;
	console.log(uid);
	if(uid == null || uid == "") {
//		console.log("用户未登录");
		return false;
	}
//	console.log("用户已登录");
	return true;
}