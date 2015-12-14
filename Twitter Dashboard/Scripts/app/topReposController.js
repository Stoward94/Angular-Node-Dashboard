(function () {

    var topReposController = function ($scope, $github) {

        var onError = function (reason) {
            $scope.error = reason.data.message;
        }

        var onRepos = function (data) {
            $scope.repos = data;
        }

        var onReposComplete = function (data) {
            console.log(data);
            $scope.userRepos = data;
        }
        
        $scope.search = function (username) {
            $github.getRepos(username).then(onReposComplete, onError);
        }

        $scope.username = "Microsoft";
        $scope.search($scope.username);

    };

    //Register controller
    var module = angular.module("twitterDashboard");
    module.controller("TopReposController", topReposController);

}());