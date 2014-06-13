qreq = require "qreq"
Q = require "q"

class DeployEmulator

  @mockDeploy: (deploy, status, delay = 0) ->
    json = { status, paty_id: Math.random(), deploy }
    deferred = Q.defer()
    setTimeout ->
      qreq.post deploy.callback_url, json
    , delay
    qreq

module.exports = DeployEmulator