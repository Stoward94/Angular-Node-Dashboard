(function () {

    //Create our angular module (with dependencies)
    var app = angular.module("twitterDashboard", ["ui.router"]);


    app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state("Home", {
                url: "/",
                templateUrl: "Views/main.html"
            })
            .state("RepoDetails", {
                url: "/repo/{username}/{reponame}",
                templateUrl: "Views/repoDetails.html",
                controller: "RepoDetailsController"
            })
            .state("RepoStatistics", {
                url: "/repo/{username}/{reponame}/statistics",
                templateUrl: "Views/repoStatistics.html",
                controller: "RepoStatisticsController"
            });

        $urlRouterProvider.otherwise("/");
    });
}());