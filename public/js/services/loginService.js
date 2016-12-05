var loginApp = angular.module("loginApp");

loginApp.factory("loginService", function($http) {
	return {
		login: function(formData) {
			return $http({
				method: "POST",
				url: "/api/login",
				data: formData,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}});
		}
	}
		
});

