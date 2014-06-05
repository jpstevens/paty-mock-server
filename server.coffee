express    = require "express"
path       = require "path"
bodyParser = require "body-parser"
fs     = require "fs"
path   = require "path"
server = null

exports.start = (port = 7289, callback = null) ->

  # init app
  app = express()

  # body parser, for parsing request body
  app.use bodyParser()

  # get API versions
  versions = fs
    .readdirSync(path.join __dirname, "api")
    .filter (el) ->
      return el.indexOf(".") isnt 0

  # api routes
  for version in versions
    app.use "/#{version}", require "./api/#{version}"

  app.get "/", (req, res) ->
    res.send "Hello from PATY mock server"

  # listen
  server = app.listen port, ->
    console.log "PATY mock server listening on port #{port}" if process.env.SHOW_LOG

exports.stop = -> 
  server.close()
  console.log "PATY-MOCK server closed" if process.env.SHOW_LOG