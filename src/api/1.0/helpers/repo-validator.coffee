class RepoValidator

  validRepos = ['alpaca', 'codas', 'fca-frontend', 'funding_circle_app']

  @hasAllRepos = (repos) ->
    
    for validRepo in validRepos
      return false unless repos[validRepo]
    true

  @isValidRepoName = (repoName) ->
    validRepos.indexOf(repoName) >= 0

  @isValid = (repos) ->
    return false unless typeof repos is "object"
    return false unless @hasAllRepos repos
    for repoName of repos
      return false unless @isValidRepoName repoName
    true

module.exports = RepoValidator