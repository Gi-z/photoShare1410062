var app = angular.module("loginApp");

app.controller("formController", ["$scope", "loginService", "$location", "$timeout", function ($scope, loginService, $location, $timeout) {
	$scope.submitForm = function() {
		var formData = $("#login_form").serialize();

		var promise = loginService.login(formData);
		promise.then(function(logResp) {
			if (logResp["data"]["success"] == "true") {
				$scope.successfulLogin = true;
				$timeout(function() { window.location = "/profile" }, 2000);
			}
			else {
				$scope.unsuccessfulLogin = true;
				$scope.logMessage = logResp["data"]["msg"];
			}
		}, function(error) {
			$scope.error = true;
			$scope.unsuccessfulLogin = true;
			$scope.logMessage = "Incorrect username/password.";
		});	
	};
}]);


