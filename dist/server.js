(function() {
  var bodyParser, express, fs, path, server;

  express = require("express");

  path = require("path");

  bodyParser = require("body-parser");

  fs = require("fs");

  path = require("path");

  server = null;

  exports.start = function(port, callback) {
    var app, version, versions, _i, _len;
    if (port == null) {
      port = 7289;
    }
    if (callback == null) {
      callback = null;
    }
    app = express();
    app.use(bodyParser());
    versions = fs.readdirSync(path.join(__dirname, "api")).filter(function(el) {
      return el.indexOf(".") !== 0;
    });
    for (_i = 0, _len = versions.length; _i < _len; _i++) {
      version = versions[_i];
      app.use("/" + version, require("./api/" + version));
    }
    app.get("/", function(req, res) {
      return res.send("Hello from PATY mock server");
    });
    return server = app.listen(port, function() {
      if (process.env.SHOW_LOG) {
        return console.log("PATY mock server [" + (process.env.NODE_ENV || 'development') + "] listening on port " + port);
      }
    });
  };

  exports.stop = function() {
    server.close();
    if (process.env.SHOW_LOG) {
      return console.log("PATY-MOCK server closed");
    }
  };

}).call(this);
