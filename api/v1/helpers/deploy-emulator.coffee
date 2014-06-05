request = require "request"

class DeployEmulator

  @successful: (callbackUrl) ->
    json =
      status: 'successful'
      paty_id: Math.random()
    request
      method: "POST"
      url: callbackUrl
      json: json
    , (err) ->
      console.error err if err

  @failed: (callbackUrl) ->
    json =
      status: 'failed'
      paty_id: Math.random()
      json: json
    request
      method: "POST"
      url: callbackUrl
      json: json
    , (err) ->
      console.error err if err

module.exports = DeployEmulator