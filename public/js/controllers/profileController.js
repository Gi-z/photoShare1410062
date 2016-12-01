var app = angular.module("profileApp");

app.controller("profileController", ["$scope", "profileService", function($scope, profileService) {
		console.log($scope.uname);
		$scope.username = uname;
		
		var promise = profileService.getProfile($scope.username);
		promise.then(function(postResp) {
			$scope.user = postResp["data"]["user"];
			console.log(postResp);
		}, function(error) {
			$scope.error = true;
			console.log("Error retrieving profile: " + error);
		});	
}]);
