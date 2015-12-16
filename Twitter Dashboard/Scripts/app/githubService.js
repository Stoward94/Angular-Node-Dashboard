(function() {

    var oAuth = "?client_id={key}&client_secret={key}";
    
    var github = function($http){
      
      var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
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
          //.then(function(response) {
          //    repo.commits = response.data;
          //    return $http.get(repo.languages_url + oAuth);
          //})
          //.then(function(response) {
          //    repo.languages = response.data;
          //    return repo;
          //});
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



        return {
          getUser: getUser,
          getRepos: getRepos,
          getRepoDetails: getRepoDetails,
          getCommits: getCommits,
          getLanguages: getLanguages
      };
        
    };
    
    var module = angular.module("twitterDashboard");
    module.factory("$github", github);
    
}());