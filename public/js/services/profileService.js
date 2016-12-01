var profileApp = angular.module("profileApp");

profileApp.factory("profileService", function($http) {
	return {
		getProfile: function(user) {
			return $http.get("/api/profile/" + user);
		}
	}
});
