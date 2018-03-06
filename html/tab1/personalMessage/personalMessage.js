 
function goToSearchResult(){
	
}


function call(){
	var phone= $("#id_phone").html();
//	var phone= document.getElementById("id_phone").value;
	console.log(phone+"A");
    plus.device.dial(phone,true); //拨打电话 false直接打了，true要用户确定
}