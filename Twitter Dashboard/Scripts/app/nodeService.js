(function () {

    var nodeService = function ($http, $rootScope) {

        var socket = null;

        var twitterStream = function (eventName, callback) {
             socket = io.connect("http://localhost:3000");

            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        var closeStream = function () {
            //$http.post("http://localhost:3000/stopStream")
            //    .then(function () { return; });
            socket.disconnect();
            socket = null;
        }

        var getUser = function (username) {

            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepos = function (user) {

            return $http.get(user.repos_url)
                .then(function (response) {
                    return response.data;
                });
        };


        return {
            twitterStream: twitterStream,
            closeStream: closeStream,
            getUser: getUser,
            getRepos: getRepos
        };
    };



    var module = angular.module("twitterDashboard");
    module.factory("nodeService", nodeService); // Register Service

}());