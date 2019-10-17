//
// Database access module
//

var Server = require('mongodb').Server;
var client = require('mongodb').MongoClient;
// var async = require('async');

exports.version = "1.0.0";

// The DataBase connection instance
var _db = undefined;

/**
 * Connect to the Database server.
 * 
 * @param {callback} The callback function when the connection is complete.
 */
exports.initDb = function (db_config, callback) {
    // Check if already have a connection
    if (_db) {
        console.log("Trying to init DB again!");
        return callback(null, _db);
    }

    var db_server = new Server(db_config.hostname, db_config.port);
    client.connect(db_server, db_config.options, connected);

    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + db_config.hostname);
        _db = db.db(db_config.database);
        return callback(null, _db);
    }
}

/**
 * Gets the current DB connection.
 * 
 * @returns {Object} The database connection object.
 */
exports.getDb = function () {
    if (!_db) {
        console.log("Database connection has not been initialized.")
    };

    return _db;
}

exports.disconnect = function () {
    client.close();
}
