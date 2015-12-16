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

        var getTwitterTrends = function(callback) {

            $.ajax({
                url: "http://localhost:3000/twitter/trending",
                dataType: "jsonp",
                crossDomain: true
            }).success(function (data) {
                    callback(data);
            })
            .error(function (responseData, textStatus, errorThrown) {
                    console.log("error");
                });
        }
        
        return {
            twitterStream: twitterStream,
            closeStream: closeStream,
            getTwitterTrends: getTwitterTrends
        };
    };



    var module = angular.module("twitterDashboard");
    module.factory("nodeService", nodeService); // Register Service

}());