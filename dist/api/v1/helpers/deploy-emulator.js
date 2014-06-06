(function() {
  var DeployEmulator, request;

  request = require("request");

  DeployEmulator = (function() {
    function DeployEmulator() {}

    DeployEmulator.successful = function(callbackUrl) {
      var json;
      json = {
        status: 'successful',
        paty_id: Math.random()
      };
      return request({
        method: "POST",
        url: callbackUrl,
        json: json
      }, function(err) {
        if (err) {
          return console.error(err);
        }
      });
    };

    DeployEmulator.failed = function(callbackUrl) {
      var json;
      json = {
        status: 'failed',
        paty_id: Math.random(),
        json: json
      };
      return request({
        method: "POST",
        url: callbackUrl,
        json: json
      }, function(err) {
        if (err) {
          return console.error(err);
        }
      });
    };

    return DeployEmulator;

  })();

  module.exports = DeployEmulator;

}).call(this);
