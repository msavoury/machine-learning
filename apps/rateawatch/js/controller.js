var watchApp = angular.module('watchApp', ['ngAnimate'], function($interpolateProvider) {
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

watchApp.factory('postService', function($http) {
	var svc = {};
	svc.postRatings = function(postObject) {
		var promise = $http.post('/api/rating', postObject).then(function(response) {
			return response.data;	
		})	
		return promise;
	};
	
	return svc;
});

watchApp.controller('watchAppCtrl', ['$scope', 'watchService','postService' , function ($scope, watchService, postService) {
	$scope.watches = [];
	$scope.dummyWatch = { rating: 0, imageLink: ''};
	$scope.currentWatch = function(){return $scope.dummyWatch};
	$scope.currentWatchIndex = 0;
	$scope.ratingOptions = [1,2,3,4,5];
	$scope.username = "";
	$scope.response = "repsonse";

	watchService.getWatches().then(function(d){
		$scope.watches = d;
		$scope.currentWatch = function() {
			if ($scope.currentWatchIndex >= $scope.watches.length) return $scope.dummyWatch;
			return $scope.watches[$scope.currentWatchIndex]
		};
	}); 

	$scope.postRatings = function() {
		postObject = {};
		postObject.username = $scope.username;
		postObject.ratings = $scope.watches;
		postService.postRatings(postObject).then(function(response){ 
			console.log("response is here");
			console.log(response);
			$scope.response = response;
		});
	};
	
	$scope.setWatchRating = function(rating) {
		$scope.currentWatch().rating = rating;
	};

	$scope.currentWatchMatchesRating = function(i) {
		return $scope.currentWatch().rating == i;
	};

	$scope.nextWatch = function() {
		$scope.currentWatchIndex++;
	}
	
	$scope.previousWatch = function() {
		if ($scope.currentWatchIndex > 0) {
			$scope.currentWatchIndex--;
		}
	}
}]);

