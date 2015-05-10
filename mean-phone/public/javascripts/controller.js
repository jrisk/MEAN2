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
		
	$scope.editContact = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response) {
			$scope.contact = response;
			});
			};
			
	$scope.update = function() {
		console.log('contact' + $scope.contact._id + ' sent for update');
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
			refresh()
			});
		};
		
	$scope.clear = function() {
		console.log('clear out the contact box');
		$scope.contact = '';
		};
}]);
