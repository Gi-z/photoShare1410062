var discoverApp = angular.module("discoverApp");

discoverApp.factory("discoverService", function($http) {
	return {
		getPosts: function() {
			return $http.get("/api/discover/");
		}
	}
});
