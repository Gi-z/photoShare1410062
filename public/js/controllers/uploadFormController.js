var app = angular.module("uploadApp");

app.controller("formController", ["$scope", "uploadService", "$location", "$timeout", function ($scope, uploadService, $location, $timeout) {
	$scope.userLoggedIn = uLog;

	$scope.submitForm = function() {
		$scope.isSubmitting = true;
		var formData = new FormData($("#upload_form")[0]);

		var promise = uploadService.upload(formData);
		promise.then(function(upResp) {
			if (upResp["data"]["success"] == "true") {
				$scope.successfulUpload = true;
				$timeout(function() { window.location = "/post/"+upResp["data"]["id"] }, 2000);
			}
			else {
				$scope.isSubmitting = false;
				$scope.unsuccessfulUpload = true;
				$scope.upMessage = upResp["data"]["msg"];
			}
		}, function(error) {
			$scope.error = true;
			$scope.isSubmitting = false;
			$scope.unsuccessfulUpload = true;
			$scope.logMessage = "Upload failed.";
		});	
	};
}]);


