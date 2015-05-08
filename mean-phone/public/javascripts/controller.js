//angular controller for view index.html

var phoneApp = angular.module('phoneApp', []);

phoneApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log("Hello from the Controller");
	
	$http.get("/contactlist").success(function(response) {
		console.log("heres the json data you requested, from our app/server/.js file");
		$scope.contactlist = response;
		});
	}]);
