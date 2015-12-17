(function() {

    var oAuth = "?client_id={key}&client_secret={key}";
    
    var github = function($http){
      
      var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username + oAuth)
                        .then(function(response){
                           return response.data; 
                        });
      };
      
      var getRepos = function (username) {
          return $http.get("https://api.github.com/users/" + username + "/repos" + oAuth)
                        .then(function(response){
                            return response.data;
                        });
      };
      
      var getRepoDetails = function(username, reponame){
          var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame + oAuth;

          return $http.get(repoUrl)
              .then(function(response) {
                  return response.data;
              });
      };

        var getCommits = function(data) {
            var url = data.url + "/commits" + oAuth + "&per_page=100";

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        };

        var getLanguages = function(data) {
            var url = data.url + "/languages" + oAuth;

            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        };

        var getStarGazers = function (url) {
            var fullUrl = url + "/stargazers" + oAuth;

            return $http.get(fullUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        var getSubscribers = function (url) {
            var fullUrl = url + "/subscribers" + oAuth;

            return $http.get(fullUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        var getBranches = function (url) {
            var fullUrl = url + "/branches" + oAuth;

            return $http.get(fullUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        var getForks = function (url) {
            var fullUrl = url + "/forks" + oAuth;

            return $http.get(fullUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        var getIssues = function (url) {
            var fullUrl = url + "/issues" + oAuth;

            return $http.get(fullUrl)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
          getUser: getUser,
          getRepos: getRepos,
          getRepoDetails: getRepoDetails,
          getCommits: getCommits,
          getLanguages: getLanguages,
          getStarGazers: getStarGazers,
          getSubscribers: getSubscribers,
          getBranches: getBranches,
          getForks: getForks,
          getIssues: getIssues
      };
        
    };
    
    var module = angular.module("twitterDashboard");
    module.factory("$github", github);
    
}());