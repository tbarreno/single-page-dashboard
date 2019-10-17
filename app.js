//
// Server setup
//

// Dependencies
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Application handlers
var appinfo_route = require('./routes/app_info');
var projects_route = require('./routes/projects');
var db = require('./modules/db');

// Configuration
var config = require('./conf/dev');

//
// Middleware configuration
// --------------------------------------------------------------------------

// Application (Express based)
var app = express();

// Logs
app.use(morgan(config.env));

// Body parsing
app.use(bodyParser.json());

//
// Routing 
// --------------------------------------------------------------------------

// Application modules (services)
app.use("/app", appinfo_route);
app.use("/api/projects", projects_route);

// Static content
app.use(express.static(path.join(__dirname, 'public')));

//
// Others
// --------------------------------------------------------------------------

// Error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//
// Startup
// --------------------------------------------------------------------------

// Listen on...
console.log("Starting the application server on port " + config.server.port );
console.log(" - Database server: " + config.db.type + "@" + config.db.hostname + ":" + config.db.port);

db.initDb(config.db, (err) => {
    if (err) {
        console.error("Error connecting with the database:");
        console.log(err);
    } else {
        app.listen(config.server.port)
    }
});
