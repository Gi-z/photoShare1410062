var postApp = angular.module("postApp");

postApp.factory("postService", function($http) {
	return {
		getPost: function(post_id, callback) {
			console.log("Got to the service " + post_id);
			return $http.get("/api/post/" + post_id);
		}
	}
});
