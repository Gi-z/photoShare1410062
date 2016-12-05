var app = angular.module("postApp");

app.controller("postController", ["$scope", "postService", function($scope, postService) {
		$scope.post_id = post_id;
		
		$scope.userLoggedIn = uLog;

		var promise = postService.getPost($scope.post_id);
		promise.then(function(postResp) {
			$scope.post = postResp["data"]["post"];
			$scope.exifInfo = $scope.post["exifRand"]
			$scope.postCurrentRating = $scope.post["rating"];
			console.log(postResp);
		}, function(error) {
			$scope.error = true;
			console.log("Error retrieving post: " + error);
		});	
		
		$scope.rateImage = function(rateOption) {
			$scope.madeRating = true;
			//var rating = $("#rateControl").val();
			var rating = rateOption;

			var formData = new FormData();
			formData["proposedRating"] = rating;			
			formData["post_id"] = post_id;
			console.log(formData);
			var promise = postService.ratePost(formData);
			promise.then(function(postResp) {
				if (postResp["data"]["success"] == "true")
					$scope.postCurrentRating = postResp["data"]["newRating"];	
			}, function(err) {});
		}	
}]);
