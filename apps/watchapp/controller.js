var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', function ($scope) {
    $scope.dog = {name: 'poodler'};
}]);
