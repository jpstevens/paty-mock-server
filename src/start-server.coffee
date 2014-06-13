path = require "path"
patyServer = require path.resolve __dirname, "server"

patyServer.start process.env.PORT or 7289