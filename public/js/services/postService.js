var postApp = angular.module("postApp");

postApp.factory("postService", function($http) {
	return {
		getPost: function(post_id, callback) {
			return $http.get("/api/post/" + post_id);
		},
		ratePost: function(formData) {
			return $http({
				method: "POST",
				url: "/api/post/"+formData["post_id"]+"/rate/"+formData["proposedRating"],
				});
		}
	}
});
