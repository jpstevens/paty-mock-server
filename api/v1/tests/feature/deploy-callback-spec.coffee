expect   = require("chai").expect
request  = require "request"
json     = require "../fixtures/valid-request"
patyServer = require "../../../../server"
patyPort   = 7289
callbackServer = require "../fixtures/callback-server"
callbackPort   = 7288

requestDeploy = (expectedStatus, callback) ->
  json.callback_url = "http://localhost:#{callbackPort}/callback"
  request
    method: "POST"
    url: "http://localhost:#{patyPort}/v1/deploy"
    json: json
    headers:
      'paty-force-status': expectedStatus
  , (err, res, body) ->
    # successful deploy request (i.e. valid package)
    expect(res.statusCode).to.equal(200)
    # callback is triggered (i.e. server receives callback)
    callbackServer.e.on "callback.#{expectedStatus}", callback

describe "callback", ->

  beforeEach -> 
    patyServer.start()
    callbackServer.start()
  
  afterEach -> 
    patyServer.stop()
    callbackServer.stop()

  describe "for failed deploy", ->

    it "responds with a 'failed' status", (done) ->
      requestDeploy "failed", (data) ->
        expect(data.status).to.equal "failed"
        done()

  describe "for successful deploy", ->

    it "responds with a 'successful' status", (done) ->
      requestDeploy "successful", (data) ->
        expect(data.status).to.equal "successful"
        done()