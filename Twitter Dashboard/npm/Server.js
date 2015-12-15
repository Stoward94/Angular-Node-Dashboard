console.log("Hello World!");


var Twit = require("twit");
var express = require("express");
var app = express();
var server = app.listen(3000);
var io = require("socket.io").listen(server);

var TWEETS_BUFFER_SIZE = 3;

var T = new Twit({
    consumer_key: "key",
    consumer_secret: "key",
    access_token: "key",
    access_token_secret: "key"
});

console.log("Listening for tweets");
var stream = T.stream("statuses/filter", { track: "github", language: "en" });
var tweetsBuffer = [];

stream.on("connect", function (request) {
    console.log("Connected to Twitter API");
});

stream.on("disconnect", function (message) {
    console.log("Disconnected from Twitter API. Message: " + message);
});

stream.on("reconnect", function(request, response, connectInterval) {
    console.log("Trying to reconnect to Twitter API in " + connectInterval + " ms");
});

stream.on("tweet", function (tweet) {

    //Create message containing tweet + username + profile pic + geo
    var msg = {};
    msg.text = tweet.text;
    msg.hashtags = tweet.entities.hashtags,
    msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
    };

    //push msg into buffer
    tweetsBuffer.push(msg);
    //send buffer only if full
    if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
        //broadcast tweets
        io.sockets.emit("tweets", tweetsBuffer);
        tweetsBuffer = [];
    }
});

app.post("/stopStream", function(req, res) {
    stream.stop();
    console.log("Twitter stream stopped");
    res.end();
});

app.get("/twitter/trending", function (req, res) {
    console.log("fetching trends");

    var msg = {}
    var trends = [];

    //UK id
    T.get("trends/place", { id: 23424975 }, function (err, data, response) {
        
        for (var i = 0; i < data[0].trends.length; i++) {

            //Some trends don't seem to have count values
            if (!data[0].trends[i].tweet_volume) continue;

            msg.label = data[0].trends[i].name;
            msg.value = data[0].trends[i].tweet_volume;

            trends.push(msg);
            msg = {};
            console.log(trends);
        }

        //return json data
        res.jsonp(trends);

    });
});

