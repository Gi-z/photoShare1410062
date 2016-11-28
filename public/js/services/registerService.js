var loginApp = angular.module("registerApp");

loginApp.factory("registerService", function() {
	return {
		register: function(formData) {
			var registerResponse = null;
			$.ajax({
				type: "POST",
                        	url: "/api/register",
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
					"msg": "Failed login request before reaching server."
				};
				return registerResponse;
			}
		}
	}
		
});

