path = require "path"
patyServer = require path.resolve __dirname, "server"

if process.env.PORT then patyServer.start(process.env.PORT) else patyServer.start()