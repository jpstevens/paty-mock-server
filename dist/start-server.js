(function() {
  var path, patyServer;

  path = require("path");

  patyServer = require(path.resolve(__dirname, "server"));

  if (process.env.PORT) {
    patyServer.start(process.env.PORT);
  } else {
    patyServer.start();
  }

}).call(this);
