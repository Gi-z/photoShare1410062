var app = angular.module("uploadApp");

function formController($scope) {
	$scope.submitForm = function() {
			
		var formData = new FormData($("#upload_form"));
		console.log(formData);

		$.ajax({
			type: "POST",
			url: "/api/upload_image",
			contentType: false,
			processData: false,
			data: formData,
			success: function(data) {
				console.log(data);
			}
		});
	};
}

