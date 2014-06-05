express = require "express"
request = require "request"
RepoValidator = require "./helpers/repo-validator"
DeployEmulator = require "./helpers/deploy-emulator"

currentDeploy = {}

# init router
apiRouter = express.Router()

apiRouter.get '/deploy', (req, res, next) ->
  res.json currentDeploy

apiRouter.post '/deploy', (req, res, next) ->
  if (typeof req.body isnt "object") or (Object.keys(req.body).length is 0)
    return res.json 417, { "Invalid JSON" }
  if !RepoValidator.isValid(req.body.repos)
    res.json 420, { "Invalid package" }
  else
    unless req.header('paty-mute-callback')
      status = req.header('paty-force-status')
      if status is "failed"
        DeployEmulator.failed req.body.callback_url
      if status is "successful"
        DeployEmulator.successful req.body.callback_url
    res.json 200, { "Successful" }


module.exports = apiRouter