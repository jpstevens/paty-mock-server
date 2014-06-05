(function() {
  var callbackPort, callbackServer, expect, json, patyPort, patyServer, request, requestDeploy;

  expect = require("chai").expect;

  request = require("request");

  json = require("../fixtures/valid-request");

  patyServer = require("../../../../server");

  patyPort = 7289;

  callbackServer = require("../fixtures/callback-server");

  callbackPort = 7288;

  requestDeploy = function(expectedStatus, callback) {
    json.callback_url = "http://localhost:" + callbackPort + "/callback";
    return request({
      method: "POST",
      url: "http://localhost:" + patyPort + "/v1/deploy",
      json: json,
      headers: {
        'paty-force-status': expectedStatus
      }
    }, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      return callbackServer.e.on("callback." + expectedStatus, callback);
    });
  };

  describe("callback", function() {
    beforeEach(function() {
      patyServer.start();
      return callbackServer.start();
    });
    afterEach(function() {
      patyServer.stop();
      return callbackServer.stop();
    });
    describe("for failed deploy", function() {
      return it("responds with a 'failed' status", function(done) {
        return requestDeploy("failed", function(data) {
          expect(data.status).to.equal("failed");
          return done();
        });
      });
    });
    return describe("for successful deploy", function() {
      return it("responds with a 'successful' status", function(done) {
        return requestDeploy("successful", function(data) {
          expect(data.status).to.equal("successful");
          return done();
        });
      });
    });
  });

}).call(this);
