(function () {

    //Create our angular module (with dependencies)
    //var app = angular.module("twitterDashboard", ["ngRoute"]);

    //var version = "?v1.0";

    ////Configure routing
    //app.config(function($routeProvider, $locationProvider) {
    //    $routeProvider
    //        .when("/", {
    //            templateUrl: "main.html?" + version
    //        })
    //        .when("/repo/:username/:reponame", {
    //            templateUrl: "repoDetails.html" + version,
    //            controller: "RepoDetailsController"
    //        })
    //        .otherwise({ redirectTo: "/" });

    //    $locationProvider.html5Mode(true);
    //});

    var app = angular.module("twitterDashboard", ["ui.router"]);


    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
          .state('Home', {
              url: "/",
              templateUrl: "main.html"
          })
          .state('RepoDetails', {
              url: "/repo/{username}/{reponame}",
              templateUrl: "repoDetails.html",
              controller: 'RepoDetailsController'
          });
        $urlRouterProvider.otherwise("/");
    });
}());