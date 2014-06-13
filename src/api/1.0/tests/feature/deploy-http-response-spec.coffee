expect  = require("chai").expect
qreq    = require "qreq"
server  = require "../../../../server"
port    = 7289
version = "1.0"
invalidPackage = require "../fixtures/invalid-request.json"
validPackage   = require "../fixtures/valid-request.json"

describe "http response", ->

  beforeEach -> server.start(port)
  afterEach -> server.stop()

  describe "for invalid package deploy", ->

    it "responds with status code 400", (done) ->
      qreq
      .post("http://localhost:#{port}/#{version}/deploy", invalidPackage)
      .then (res) ->
        expect(res.statusCode).to.equal 400
        done()
      .fail (err) ->
        console.log err

  describe "for succesful deploy", ->

    it "responds with status code 200", (done) ->
      qreq
      .post("http://localhost:#{port}/#{version}/deploy", validPackage)
      .then (res) ->
        expect(res.statusCode).to.equal 200
        done()

  describe "for rate-limit exceeded", ->
  describe "for unauthorized deploy", ->