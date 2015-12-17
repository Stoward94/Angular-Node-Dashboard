(function() {

    var repoStatisticsController = function ($scope, $github, $stateParams) {

        //Get values for URL
        $scope.username = $stateParams.username;
        $scope.reponame = $stateParams.reponame;

        var onError = function (reason) {
            $scope.error = "Could not fetch the data from the GitHub API";
        };

        //Process Repo Stargazers data
        var onStargazers = function (data) {
            $scope.stargazers = data;
        };

        //Process Repo Subscribers data
        var onSubscribers = function (data) {
            $scope.subscribers = data;
        };

        //Process Repo Branches data
        var onBranches = function (data) {
            $scope.branches = data;
        };

        //Process Repo Forks data
        var onForks = function (data) {
            $scope.forks = data;
        };

        //Process Repo Issues data
        var onIssues = function (data) {
            $scope.issues = data;
        };

        var baseUrl = "https://api.github.com/repos/" + $scope.username + "/" + $scope.reponame;

        //Fire request for repo details
        $github.getStarGazers(baseUrl).then(onStargazers, onError);
        $github.getSubscribers(baseUrl).then(onSubscribers, onError);
        $github.getBranches(baseUrl).then(onBranches, onError);
        //$github.getForks(baseUrl).then(onForks, onError);
        $github.getIssues(baseUrl).then(onIssues, onError);
    };

    //Register controller
    var module = angular.module("twitterDashboard");
    module.controller("RepoStatisticsController", repoStatisticsController);

}());