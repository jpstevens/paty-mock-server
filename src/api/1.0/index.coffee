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
  # run validation
  if (typeof req.body isnt "object") or not (RepoValidator.isValid req.body.repos)
    return res.json 400, { message: "Invalid package" }
  else
    res.json { message: "Deploy request added to queue #{req.body._id}" }

  # PATY-FORCE-STATUS
  status = req.header('paty-force-status') or 'success'
  
  # PATY-CALLBACK-DELAY
  delay = 0 or req.header 'paty-callback-delay'

  # PATY-MUTE-CALLBACK
  if req.header 'paty-mute-callback' then return
    
  # mock the deploy
  DeployEmulator
  .mockDeploy req.body, status, delay

module.exports = apiRouter