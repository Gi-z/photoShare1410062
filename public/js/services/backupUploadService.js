var uploadApp = angular.module("uploadApp");

uploadApp.factory("uploadService", function() {
	return {
		upload:	function(formData) {
				var uploadResponse = null;
				$.ajax({
					type: "POST",
					url: "/api/upload_image",
					contentType: false,
					processData: false,
					data: formData,
					success: function(data) {
						uploadResponse = data;
					}
				 });

				if (uploadResponse) {
					return uploadResponse;
				}
				else {
					uploadResponse = {
						"success": "false",
						"msg": "Failed upload request before reaching server."
					};
					return uploadResponse;
				}
		}
	}
});
