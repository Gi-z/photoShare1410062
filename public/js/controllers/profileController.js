var app = angular.module("profileApp");

app.controller("profileController", ["$scope", "profileService", function($scope, profileService) {
		$scope.username = uLog["user"];
		
		var promise = profileService.getProfile($scope.username);
		promise.then(function(postResp) {
			$scope.user = postResp["data"]["user"];
			console.log(postResp);
		}, function(error) {
			$scope.error = true;
			console.log("Error retrieving profile: " + error);
		});	
}]);
