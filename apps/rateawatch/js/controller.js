var watchApp = angular.module('watchApp', [], function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
});

watchApp.factory('watchService', function($http) {
	var svc = {};
	svc.watches = {};
	svc.getWatches = function() {
		var promise = $http.get('/static-data/watches.json').then(function(response){
			return response.data;
		});
		return promise;
	};

	return svc;

});

watchApp.controller('watchAppCtrl', ['$scope', 'watchService', function ($scope, watchService) {
	$scope.watches = [];
	$scope.currentWatch = function(){return{}};
	$scope.currentWatchIndex = 0;
	$scope.ratingOptions = [1,2,3,4,5];

	watchService.getWatches().then(function(d){
		$scope.watches = d;
		$scope.currentWatch = function() {return $scope.watches[$scope.currentWatchIndex]};
	}); 

	$scope.setWatchRating = function(rating) {
		$scope.currentWatch().rating = rating;
	};

	$scope.currentWatchMatchesRating = function(i) {
		return $scope.currentWatch().rating == i;
	}

	$scope.nextWatch = function() {
		if ($scope.currentWatchIndex <= $scope.watches.length - 2) {
			$scope.currentWatchIndex++;
		}
	}
	
	$scope.previousWatch = function() {
		if ($scope.currentWatchIndex > 0) {
			$scope.currentWatchIndex--;
		}
	}
}]);

