express = require "express"
bodyParser = require "body-parser"
server = null
EventEmitter = require('events').EventEmitter
e = new EventEmitter()

exports.start = (port = 7288) ->
  app = express()
  app.use bodyParser()
  app.post "/callback", (req, res) ->
    res.send 200
    e.emit "callback.#{req.body.status}", req.body
  server = app.listen port, ->
    console.log "CALLBACK server listening on port #{port}" if process.env.SHOW_LOG

exports.stop = ->
  server.close()
  console.log "CALLBACK server closed" if process.env.SHOW_LOG

exports.e = e

