var watchApp = angular.module('watchApp', [], function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
});


watchApp.controller('watchAppCtrl', ['$scope', function ($scope) {
    $scope.dog = {name: 'poodler'};
}]);

