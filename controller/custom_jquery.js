toggle_alert = function(scope, flag, text){
	var alert = angular.element(document.getElementById('arrangealert'));	
	if(!flag) {
		scope.warning_msg = text;
		console.log(scope.warning_msg);
		alert.fadeIn();
	}
	else {
		scope.warning_msg = "";
		alert.fadeOut();
	}
}

module.exports = {
	toggle_alert
};