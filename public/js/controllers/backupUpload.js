var app = angular.module("uploadApp");

app.controller("formController", ["$scope", "uploadService", function ($scope, uploadService) {
	$scope.submitForm = function() {
		var formData = new FormData($("#upload_form")[0]);
		
		uploadService.upload(formData);
	};
}]);


