(function() {
  var DeployEmulator, RepoValidator, apiRouter, currentDeploy, express, request;

  express = require("express");

  request = require("request");

  RepoValidator = require("./helpers/repo-validator");

  DeployEmulator = require("./helpers/deploy-emulator");

  currentDeploy = {};

  apiRouter = express.Router();

  apiRouter.get('/deploy', function(req, res, next) {
    return res.json(currentDeploy);
  });

  apiRouter.post('/deploy', function(req, res, next) {
    var status;
    if ((typeof req.body !== "object") || (Object.keys(req.body).length === 0)) {
      return res.json(417, {
        "Invalid JSON": "Invalid JSON"
      });
    }
    if (!RepoValidator.isValid(req.body.repos)) {
      return res.json(420, {
        "Invalid package": "Invalid package"
      });
    } else {
      if (!req.header('paty-mute-callback')) {
        status = req.header('paty-force-status');
        if (status === "failed") {
          DeployEmulator.failed(req.body.callback_url);
        }
        if (status === "successful") {
          DeployEmulator.successful(req.body.callback_url);
        }
      }
      return res.json(200, {
        "Successful": "Successful"
      });
    }
  });

  module.exports = apiRouter;

}).call(this);
