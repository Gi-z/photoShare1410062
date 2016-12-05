var profileApp = angular.module("profileApp");

profileApp.factory("profileService", function($http) {
	return {
		getProfile: function(user) {
			return $http.get("/api/profile/" + user);
		},
		rateUser: function(formData) {
			return $http({
				method: "POST",
				url: "/api/profile/"+formData["username"]+"/rate/"+formData["proposedRating"],
				});
		}
	}
});
