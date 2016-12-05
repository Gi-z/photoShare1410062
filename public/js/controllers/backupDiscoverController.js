var app = angular.module("discoverApp");

app.controller("discoverController", ["$scope", "discoverService", function ($scope, discoverService) {
	
	var promise = discoverService.getPosts();
	promise.then(function(postResp) {
		$scope.posts = JSON.parse(postResp["data"]["posts"]);
	}, function(error) {
		$scope.error = true;
		console.log("Error retrieving posts: " + error);
	});	
		
}]);


