(function() {
  var RepoValidator, expect, fs, path;

  expect = require("chai").expect;

  fs = require("fs");

  path = require("path");

  RepoValidator = require("../../helpers/repo-validator");

  describe("RepoValidator", function() {
    var repos, reposJSON;
    repos = null;
    reposJSON = fs.readFileSync(path.resolve(__dirname, "..", "fixtures", "valid-request.json"), 'utf-8');
    beforeEach(function() {
      return repos = JSON.parse(reposJSON).repos;
    });
    afterEach(function() {
      return repos = null;
    });
    describe("#isValidRepoName", function() {
      it("returns true for valid repos", function() {
        var repoData, repoName, _results;
        _results = [];
        for (repoName in repos) {
          repoData = repos[repoName];
          _results.push(expect(RepoValidator.isValidRepoName(repoName)).to.equal(true));
        }
        return _results;
      });
      return it("returns false for invalid repos", function() {
        return expect(RepoValidator.isValidRepoName("invalid")).to.equal(false);
      });
    });
    describe("#isValidBranch", function() {
      it("returns true for valid branches", function() {
        var repoData, repoName, _results;
        _results = [];
        for (repoName in repos) {
          repoData = repos[repoName];
          _results.push(expect(RepoValidator.isValidBranch(repoName, repoData.branch)).to.equal(true));
        }
        return _results;
      });
      it("returns false for invalid branches", function() {
        var repoData, repoName, _results;
        _results = [];
        for (repoName in repos) {
          repoData = repos[repoName];
          repoData.branch = {
            branch: "invalid-branch"
          };
          _results.push(expect(RepoValidator.isValidBranch(repoName, repoData.branch)).to.equal(false));
        }
        return _results;
      });
      return it("returns false for missing branches", function() {
        var repoData, repoName, _results;
        _results = [];
        for (repoName in repos) {
          repoData = repos[repoName];
          _results.push(expect(RepoValidator.isValidBranch(repoName, null)).to.equal(false));
        }
        return _results;
      });
    });
    return describe("#isValid", function() {
      it("returns true for valid repos", function() {
        return expect(RepoValidator.isValid(repos)).to.equal(true);
      });
      it("returns false for repos with an invalid branch", function() {
        repos['codas'] = {
          branch: 'invalid-branch'
        };
        return expect(RepoValidator.isValid(repos)).to.equal(false);
      });
      it("returns false for repos with an invalid repo name", function() {
        repos['invalid-repo-name'] = {
          branch: 'master'
        };
        return expect(RepoValidator.isValid(repos)).to.equal(false);
      });
      it("returns false for repos missing a required repo", function() {
        delete repos['codas'];
        return expect(RepoValidator.isValid(repos)).to.equal(false);
      });
      it("returns false for a non-json value", function() {
        return expect(RepoValidator.isValid("invalid")).to.equal(false);
      });
      return it("returns false for missing branches", function() {
        var repoData, repoName;
        for (repoName in repos) {
          repoData = repos[repoName];
          delete repos[repoName].branch;
        }
        return expect(RepoValidator.isValid(repos)).to.equal(false);
      });
    });
  });

}).call(this);
