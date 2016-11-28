var app = angular.module("loginApp");

app.controller("formController", ["$scope", "loginService", function ($scope, loginService) {
	$scope.submitForm = function() {
		var formData = $("#login_form").serialize();
		loginService.login(formData);
	};
}]);


