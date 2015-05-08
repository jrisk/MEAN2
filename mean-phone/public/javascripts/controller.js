//angular controller for view index.html

var phoneApp = angular.module('phoneApp', []);

phoneApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log('Hello from the Controller');
	
	var refresh = function() {
	$http.get('/contactlist').success(function(response) {
		console.log('heres the json data you requested, from our app/server/.js file');
		$scope.contactlist = response;
		$scope.contact = '';
		});
		};
	
	refresh();
	
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response) {
			console.log(response);
			refresh();
			});
		};
		
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response) {
			refresh();
		});
		};
}]);
