var app = angular.module("registerApp");

app.controller("formController", ["$scope", "registerService", "$location", "$timeout", function ($scope, registerService, $location, $timeout) {
	$scope.submitForm = function() {
		var formData = $("#register_form").serialize();

		var promise = registerService.register(formData);
		promise.then(function(regResp) {
			if (regResp["data"]["success"] == "true") {
				$scope.successfulRegistration = true;
				$timeout(function() { window.location = "/login" }, 2000);
			}
			else {
				$scope.unsuccessfulRegistration = true;
				$scope.regMessage = regResp["data"]["msg"];
			}
		}, function(error) {
			$scope.error = true;
			$scope.unsuccessfulRegistration = false;
			$scope.regMessage = "There was an unknown error in registration.";
		});	
	};
}]);


