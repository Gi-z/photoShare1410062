var app = angular.module("registerApp");

app.controller("formController", ["$scope", "registerService", function ($scope, registerService) {
	$scope.submitForm = function() {
		var formData = $("#register_form").serialize();
		var registerResponse = registerService.register(formData);
		console.log(registerResponse);
	};
}]);


