(function () {

    //Create our angular module (with dependencies)
    var app = angular.module("twitterDashboard", ["ngRoute"]);

    //Configure routing
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "repoDetails.html"
            })
            .otherwise({ redirectTo: "/main" });

        $locationProvider.html5Mode(true);
    });
}());