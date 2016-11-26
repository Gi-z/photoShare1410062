var registerApp = angular.module("registerApp");

registerApp.factory("registerService", function($data, $scope) {
	var registerResponse = null;
	$.ajax({
                        type: "POST",
                        url: "/api/register",
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function(data) {
                               	registerResponse = data;
                        }
        });

	if (registerResponse) {
		return registerResponse;
	}
	else {
		registerResponse = {
			"success": "false",
			"msg": "Failed register request before reaching server."
		};
		return registerResponse;
	}
});
