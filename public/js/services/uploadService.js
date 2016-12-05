var uploadApp = angular.module("uploadApp");

uploadApp.factory("uploadService", function($http) {
	return {
		upload: function(formData) {
			return $http({
				method: "POST",
				url: "/api/upload_image",
				data: formData,
				headers: {
					"Content-Type": undefined,
				}});
		}
	}
		
});

