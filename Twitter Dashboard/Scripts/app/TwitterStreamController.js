(function () {

    var twitterStreamController = function ($scope, nodeService) {

        var twitterStream = $("#twitter-stream");
        
        var startStream = function () {

            $scope.stream = stopStream;
            $scope.btnText = "Stop Stream";
            $scope.active = true;

            nodeService.twitterStream("tweets", function (data) {
                $scope.tweets = $scope.tweets.concat(data);
                console.log(data);

                twitterStream.animate({
                    scrollTop: twitterStream.get(0).scrollHeight
                }, 100);
            });
        };

        var stopStream = function () {

            $scope.stream = startStream;
            $scope.btnText = "Start Stream";
            $scope.active = false;
            
            nodeService.closeStream();
        };

        var getTrendingTweets = function (data) {
            //Graph initialisation
            Morris.Donut({
                element: "trending-chart",
                data: data
            });
        };

        var onBadError = function(detail) {
            console.log(detail.text);
        };

        //Fetch trending keywords
        nodeService.getTwitterTrends(getTrendingTweets);

        //$scope members
        $scope.tweets = [];
        $scope.stream = startStream;
        $scope.active = false;
        $scope.btnText = "Start Stream";
    };

    //Register controller
    var module = angular.module("twitterDashboard");
    module.controller("TwitterStreamController", twitterStreamController);

}());