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
        /*
		var promise = $http.post('/api/rating', postObject).then(function(response) {
			return response.data;	
		})	
        */
		var promise = $http.get('/static-data/results.json', postObject).then(function(response) {
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
	$scope.response = "response";
	$scope.isResultReady = false;
	$scope.results = { 
					   "users": { "similar" : [ {"username":"shawn", "score": 12},{"username":"shawn", "score": 14}] },
					   "ratings" : { "mvmt1" : {"avg": 3.1, "high": 2.7}, "mvmt1" : {"avg": 3.1, "high": 2.7}} 
                     };

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
			$scope.response = response;
			$scope.isResultReady = true;
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

	$scope.getSimilarUsers = function() {
		return $scope.results['users']['similar'];

	}

	$scope.getRatingsForWatchId = function(id) {
		return $scope.results['ratings'][id] || "";

	}
}]);

