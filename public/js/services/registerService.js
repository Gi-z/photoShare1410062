var registerApp = angular.module("registerApp");

registerApp.factory("registerService", function($http) {
	return {
		register: function(formData) {
			console.log(formData);
			return $http({
				method: "POST",
				url: "/api/register",
				data: formData,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}});
		}
	}
		
});

