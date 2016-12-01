var homeApp = angular.module("homeApp");

homeApp.factory("homeFeedService", function($http) {
	return {
		getPosts: function() {
			return $http.get("/api/home/");
		}
	}
});
