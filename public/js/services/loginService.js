var loginApp = angular.module("loginApp");

loginApp.factory("loginService", function() {
	return {
		login: function(formData) {
			var loginResponse = null;
			$.ajax({
				type: "POST",
                        	url: "/api/login",
                        	data: formData,
                        	success: function(data) {
			 	      	loginResponse = data;
                        	}
			});

			if (loginResponse) {
				return loginResponse;
			}
			else {
				loginResponse = {
					"success": "false",
					"msg": "Failed login request before reaching server."
				};
				return loginResponse;
			}
		}
	}
		
});
