(function() {
  var expect, invalidPackage, port, request, server, validPackage;

  expect = require("chai").expect;

  request = require("request");

  server = require("../../../../server");

  port = 7289;

  invalidPackage = require("../fixtures/invalid-request.json");

  validPackage = require("../fixtures/valid-request.json");

  describe("http response", function() {
    beforeEach(function() {
      return server.start(port);
    });
    afterEach(function() {
      return server.stop();
    });
    describe("for invalid JSON deploy", function() {
      return it("responds with status code 417", function(done) {
        return request({
          method: "POST",
          url: "http://localhost:" + port + "/v1/deploy",
          body: "this-is-not-json"
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(417);
          return done();
        });
      });
    });
    describe("for invalid package deploy", function() {
      return it("responds with status code 420", function(done) {
        return request({
          method: "POST",
          url: "http://localhost:" + port + "/v1/deploy",
          json: invalidPackage
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(420);
          return done();
        });
      });
    });
    describe("for succesful deploy", function() {
      return it("responds with status code 200", function(done) {
        return request({
          method: "POST",
          url: "http://localhost:" + port + "/v1/deploy",
          json: validPackage,
          headers: {
            'paty-mute-callback': true
          }
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(200);
          return done();
        });
      });
    });
    describe("for rate-limit exceeded", function() {});
    return describe("for unauthorized deploy", function() {});
  });

}).call(this);
