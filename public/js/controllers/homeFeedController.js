var app = angular.module("homeApp");

app.controller("homeFeedController", ["$scope", "homeFeedService", function ($scope, homeFeedService) {
	$scope.userLoggedIn = uLog;
	var promise = homeFeedService.getPosts();
	promise.then(function(postResp) {
		$scope.error = false;
		$scope.posts = JSON.parse(postResp["data"]["posts"]);
		console.log(postResp);
	}, function(error) {
		$scope.error = true;
		console.log("Error retrieving posts: " + error);
	});	
		
}]);


