class RepoValidator

  validRepos =
    alpaca:
      branch: ["master", "valid-alpaca"]
    codas:
      branch: ["master", "valid-codas"]
    'fca-frontend':
      branch: ["master", "valid-fca-frontend"]
    funding_circle_app:
      branch: ["production", "valid-funding-circle-app"]

  @hasAllRepos = (repos) ->
    for validRepoName, validRepoData of validRepos
      return false unless repos[validRepoName]
    true

  @isValidRepoName = (repoName) ->
    validRepos[repoName]?

  @isValidBranch = (repoName, branch) ->
    return false unless validRepos[repoName].branch
    validRepos[repoName].branch.indexOf(branch) >= 0

  @isValid = (repos) ->
    return false unless typeof repos is "object"
    return false unless @hasAllRepos repos
    for repoName, repoData of repos
      return false unless @isValidRepoName repoName
      return false unless @isValidBranch repoName, repoData.branch
    true

module.exports = RepoValidator