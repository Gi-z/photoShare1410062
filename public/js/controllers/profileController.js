var app = angular.module("profileApp");

app.controller("profileController", ["$scope", "profileService", function($scope, profileService) {
		$scope.userLoggedIn = uLog;
		$scope.username = uLog["user"];
	
		var username = $scope.username;	
	
		var promise = profileService.getProfile($scope.username);
		promise.then(function(postResp) {
			$scope.user = postResp["data"]["user"];
			$scope.currentUserRating = $scope.user["rating"];
		}, function(error) {
			$scope.error = true;
			console.log("Error retrieving profile: " + error);
		});	
	
		$scope.rateUser = function(rateOption) {
			$scope.madeRating = true;
			var rating = rateOption;
			console.log(rating);
			var formData = new FormData();
			formData["proposedRating"] = rating;			
			formData["username"] = username;
			var promise = profileService.rateUser(formData);
			promise.then(function(postResp) {
				if (postResp["data"]["success"] == "true")
					$scope.currentUserRating = postResp["data"]["newRating"];	
			}, function(err) {});
		}	
}]);
