expect  = require("chai").expect
request = require "request"
server  = require "../../../../server"
port    = 7289
invalidPackage = require "../fixtures/invalid-request.json"
validPackage   = require "../fixtures/valid-request.json"

describe "http response", ->

  beforeEach -> server.start(port)
  afterEach -> server.stop()

  describe "for invalid JSON deploy", ->

    it "responds with status code 417", (done) ->

      request
        method: "POST"
        url: "http://localhost:#{port}/v1/deploy"
        body: "this-is-not-json"
      , (err, res, body) ->
        expect(res.statusCode).to.equal 417
        done()

  describe "for invalid package deploy", ->

    it "responds with status code 420", (done) ->

      request
        method: "POST"
        url: "http://localhost:#{port}/v1/deploy"
        json: invalidPackage
      , (err, res, body) ->
        expect(res.statusCode).to.equal 420
        done()

  describe "for succesful deploy", ->

    it "responds with status code 200", (done) ->

      request
        method: "POST"
        url: "http://localhost:#{port}/v1/deploy"
        json: validPackage
        headers: { 'paty-mute-callback': true }
      , (err, res, body) ->
        expect(res.statusCode).to.equal 200
        done()

  describe "for rate-limit exceeded", ->
  describe "for unauthorized deploy", ->