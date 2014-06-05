expect = require("chai").expect
fs = require "fs"
path = require "path"
RepoValidator = require "../../helpers/repo-validator"

describe "RepoValidator", ->

  repos = null
  reposJSON = fs.readFileSync path.resolve(__dirname, "..", "fixtures", "valid-request.json"), 'utf-8'
  
  beforeEach -> repos = JSON.parse(reposJSON).repos
  afterEach -> repos = null

  describe "#isValidRepoName", ->

    it "returns true for valid repos", ->
      for repoName, repoData of repos
        expect(RepoValidator.isValidRepoName repoName).to.equal true

    it "returns false for invalid repos", ->
      expect(RepoValidator.isValidRepoName "invalid").to.equal false

  describe "#isValidBranch", ->

    it "returns true for valid branches", ->
      for repoName, repoData of repos
        expect(RepoValidator.isValidBranch repoName, repoData.branch).to.equal true

    it "returns false for invalid branches", ->
      for repoName, repoData of repos
        repoData.branch = { branch: "invalid-branch" }
        expect(RepoValidator.isValidBranch repoName, repoData.branch).to.equal false

  describe "#isValidBranch", ->

    it "returns true for valid branches", ->
      for repoName, repoData of repos
        expect(RepoValidator.isValidBranch repoName, repoData.branch).to.equal true

    it "returns false for invalid branches", ->
      for repoName, repoData of repos
        repoData.branch = "invalid-branch"
        expect(RepoValidator.isValidBranch repoName, repoData.branch).to.equal false

    it "returns false for missing branches", ->
      for repoName, repoData of repos
        expect(RepoValidator.isValidBranch repoName, null).to.equal false

  describe "#isValid", ->

    it "returns true for valid repos", ->
      expect(RepoValidator.isValid repos).to.equal true

    it "returns false for repos with an invalid branch", ->
      repos['codas'] = { branch: 'invalid-branch' }
      expect(RepoValidator.isValid repos).to.equal false

    it "returns false for repos with an invalid repo name", ->
      repos['invalid-repo-name'] = { branch: 'master' }
      expect(RepoValidator.isValid repos).to.equal false

    it "returns false for repos missing a required repo", ->
      delete repos['codas']
      expect(RepoValidator.isValid repos).to.equal false

    it "returns false for a non-json value", ->
      expect(RepoValidator.isValid "invalid").to.equal false

    it "returns false for missing branches", ->
      delete repos[repoName].branch for repoName, repoData of repos
      expect(RepoValidator.isValid repos).to.equal false
