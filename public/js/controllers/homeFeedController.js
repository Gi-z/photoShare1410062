var app = angular.module("homeApp");

app.controller("homeFeedController", ["$scope", "homeFeedService", function ($scope, homeFeedService) {
	
	var promise = homeFeedService.getPosts();
	promise.then(function(postResp) {
		$scope.posts = JSON.parse(postResp["data"]["posts"]);
	}, function(error) {
		$scope.error = true;
		console.log("Error retrieving posts: " + error);
	});	
		
}]);


