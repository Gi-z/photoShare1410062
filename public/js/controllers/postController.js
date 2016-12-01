var app = angular.module("postApp");

app.controller("postController", ["$scope", "postService", function($scope, postService) {
		console.log(post_id);
		$scope.post_id = post_id;
		
		var promise = postService.getPost($scope.post_id);
		promise.then(function(postResp) {
			$scope.post = postResp["data"]["post"];
			console.log(postResp);
		}, function(error) {
			$scope.error = true;
			console.log("Error retrieving post: " + error);
		});	
}]);
