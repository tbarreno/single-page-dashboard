/**
 * Route for the application configuration.
 */

var express = require("express");

var app_info_conf = require("../conf/app_info");

var app_info_router = express.Router();

/**
 * GET / : returns the aplication UI configuration.
 */
app_info_router.get("/info", function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(app_info_conf.ui));
})

module.exports = app_info_router;

