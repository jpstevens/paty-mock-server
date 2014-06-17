qreq = require "qreq"
Q = require "q"

class DeployEmulator

  @mockDeploy: (deploy, status, delay = 0) ->
    console.log "> deploying #{deploy._id} status #{status}"
    json = { status, paty_id: Math.random(), deploy }
    deferred = Q.defer()
    setTimeout ->
      qreq.post deploy.callback_url, json
    , (delay*1000)
    qreq

module.exports = DeployEmulator