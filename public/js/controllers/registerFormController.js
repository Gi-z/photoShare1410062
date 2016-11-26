var app = angular.module("registerApp", []);

function formController($scope) {
	$scope.submitForm = function() {
			
		var formData = $("#register_form").serialize();
		console.log(formData);                          

		$.ajax({
			type: "POST",
			url: "/api/register",
			data: formData,
			success: function(data) {
				console.log(data);
			}
		});
	};
}

