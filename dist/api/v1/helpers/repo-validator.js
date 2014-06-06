(function() {
  var RepoValidator;

  RepoValidator = (function() {
    var validRepos;

    function RepoValidator() {}

    validRepos = {
      alpaca: {
        branch: ["master", "valid-alpaca"]
      },
      codas: {
        branch: ["master", "valid-codas"]
      },
      'fca-frontend': {
        branch: ["master", "valid-fca-frontend"]
      },
      funding_circle_app: {
        branch: ["production", "valid-funding-circle-app"]
      }
    };

    RepoValidator.hasAllRepos = function(repos) {
      var validRepoData, validRepoName;
      for (validRepoName in validRepos) {
        validRepoData = validRepos[validRepoName];
        if (!repos[validRepoName]) {
          return false;
        }
      }
      return true;
    };

    RepoValidator.isValidRepoName = function(repoName) {
      return validRepos[repoName] != null;
    };

    RepoValidator.isValidBranch = function(repoName, branch) {
      if (!validRepos[repoName].branch) {
        return false;
      }
      return validRepos[repoName].branch.indexOf(branch) >= 0;
    };

    RepoValidator.isValid = function(repos) {
      var repoData, repoName;
      if (typeof repos !== "object") {
        return false;
      }
      if (!this.hasAllRepos(repos)) {
        return false;
      }
      for (repoName in repos) {
        repoData = repos[repoName];
        if (!this.isValidRepoName(repoName)) {
          return false;
        }
        if (!this.isValidBranch(repoName, repoData.branch)) {
          return false;
        }
      }
      return true;
    };

    return RepoValidator;

  })();

  module.exports = RepoValidator;

}).call(this);
