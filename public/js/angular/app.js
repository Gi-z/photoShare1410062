var app = angular.module("homepage", []);
angular.module("homepage", ["ui.router"]);

//Config block.
app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state("home", {
			url: "/home",
			controller: "MainCtrl"
		});

	$urlRouterProvider.otherwise("home");
}]);

//FACTORIES
app.factory("images", [function() {
	//Image loading service linkup.
}]);

app.factory("posts", [function() {
	//Post loading service linkup.
}]);

app.factory("users", [function() {
	//Users service linkup.
}]);

app.factory("discovery_posts", [function() {
	//Discovery service linkup.
}]);

//Controllers.
app.controller("MainCtrl", function($scope, $http) {
	$scope.msg = "Hello, World!";
	$http.get("	
}]);


