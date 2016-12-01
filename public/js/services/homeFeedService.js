var homeApp = angular.module("homeApp");

homeApp.factory("homeFeedService", function($http) {
	return {
		getPosts: function(post_id, callback) {
			return $http.get("/api/home/");
		}
	}
});
