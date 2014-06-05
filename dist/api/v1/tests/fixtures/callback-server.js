(function() {
  var EventEmitter, bodyParser, e, express, server;

  express = require("express");

  bodyParser = require("body-parser");

  server = null;

  EventEmitter = require('events').EventEmitter;

  e = new EventEmitter();

  exports.start = function(port) {
    var app;
    if (port == null) {
      port = 7288;
    }
    app = express();
    app.use(bodyParser());
    app.post("/callback", function(req, res) {
      res.send(200);
      return e.emit("callback." + req.body.status, req.body);
    });
    return server = app.listen(port, function() {
      if (process.env.SHOW_LOG) {
        return console.log("CALLBACK server listening on port " + port);
      }
    });
  };

  exports.stop = function() {
    server.close();
    if (process.env.SHOW_LOG) {
      return console.log("CALLBACK server closed");
    }
  };

  exports.e = e;

}).call(this);
