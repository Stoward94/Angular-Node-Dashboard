(function() {

    var repoDetailsContoller = function ($scope, $github, $stateParams) {

        //Get values for URL
        $scope.username = $stateParams.username;
        $scope.reponame = $stateParams.reponame;

        var initBarChart = function (data) {
            var src = [];

            for (var n in data) {
                var d = {
                    y: n,
                    a: data[n]
                };
                src.push(d);
            };

            Morris.Bar({
                element: "languages-bar-chart",
                data: src,
                xkey: "y",
                ykeys: "a",
                labels: "Lines"
            });
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data from the GitHub API";
        };

        //Process Repo Languages data
        var onLanguagesComplete = function (data) {
            $scope.repo.languages = data;
            console.log(data);
            initBarChart(data);
        };

        //Process Repo Commits data
        var onCommitsComplete = function (data) {
            $scope.repo.commits = data;
            $github.getLanguages($scope.repo).then(onLanguagesComplete, onError);

        };

        //Process Repo Details data
        var onRepos = function (data) {
            $scope.repo = data;
            $github.getCommits($scope.repo).then(onCommitsComplete, onError);
        };

        //Fire request for repo details
        $github.getRepoDetails($scope.username, $scope.reponame).then(onRepos, onError);
    };

    //Register controller
    var module = angular.module("twitterDashboard");
    module.controller("RepoDetailsController", repoDetailsContoller);

}());