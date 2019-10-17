/**
 * Module for project storage.
 */

var db_module = require("./db.js");
var crypto = require("crypto");

/**
 * Gets all the projects from the DataBase.
 */
exports.get_all_projects = function (callback) {

    let db = db_module.getDb();

    if (db) {

        var collection = db.collection('Projects');
        var cursor = collection.find({});
        let project_list = [];
        cursor.forEach(function (item) {
            if (item != null) {
                project_list.push({
                    id: item.id,
                    name: item.name,
                    description: item.description
                });
            }
        }, function (err) {
            callback({
                status: "success",
                data: {
                    projects:
                        project_list
                }
            });
            // db.close();
        }
        );
    } else {
        console.log("Error: there's no connection to the database.");
        callback({
            status: "error",
            message: "Couldn't connect to the database."
        });
    }
}

/**
 * Gets a project by ID.
 */
exports.get_project_by_id = function (id, callback) {

    let db = db_module.getDb();

    if (db) {

        var collection = db.collection('Projects');
        var cursor = collection.findOne({ id: id }, (err, result) => {
            if (err) {
                callback({
                    status: "error",
                    message: "Error getting the project.",
                    error: err
                });
            } else {
                callback({
                    status: "success",
                    data: {
                        project: {
                            id: result.id,
                            name: result.name,
                            description: result.description
                        }
                    }
                });
            }
        });
    } else {
        console.log("Error: there's no connection to the database.");
        callback({
            status: "error",
            message: "Couldn't connect to the database."
        });
    }
}

/**
 * Adds a project to the collection.
 * 
 * TODO: Move the database stuff to a "service" module.
 */
exports.add_project = function (data, callback) {
    let db = db_module.getDb();

    if (db) {
        var collection = db.collection('Projects');

        // TODO: Validate the data
        let project_data = data;
        project_data.id = crypto.randomBytes(20).toString('hex').substring(0, 8);

        collection.insertOne(project_data, function (err, result) {
            if (err === null) {
                response = {
                    status: "success",
                    data: {
                        project: {
                            id: result.ops[0].id,
                            name: result.ops[0].name,
                            description: result.ops[0].description
                        }
                    }
                };
                callback(response);
            } else {
                callback({
                    status: "error",
                    message: "Error storing the data.",
                    error: err
                });
            }
        });
    } else {
        console.log("Error: there's no connection to the database.");
        callback({
            status: "error",
            message: "Couldn't connect to the database."
        });
    }
}

/**
 * Deletes a project by ID.
 */
exports.delete_project_by_id = function (id, callback) {

    let db = db_module.getDb();

    if (db) {

        var collection = db.collection('Projects');
        var cursor = collection.deleteOne({ id: id }, (err, result) => {
            if (err) {
                callback({
                    status: "error",
                    message: "Error deleting the project.",
                    error: err
                });
            } else {
                callback({
                    status: "success",
                    data: {}
                });
            }
        });
    } else {
        console.log("Error: there's no connection to the database.");
        callback({
            status: "error",
            message: "Couldn't connect to the database."
        });
    }
}

/**
 * Updates a project data.
 */
exports.update_project = function (id, data, callback) {
    let db = db_module.getDb();

    if (db) {
        var collection = db.collection('Projects');

        // The ID can't be modified
        var new_values = {
            $set: {
                name: data.name, 
                description: data.description
            }
        };

        collection.updateOne({ id: id }, new_values, (err, result) => {
            if (err) {
                callback({
                    status: "error",
                    message: "Error updating the project.",
                    error: err
                });
            } else {
                callback({
                    status: "success",
                    data: {
                        project: {
                            id: result.id,
                            name: result.name,
                            description: result.description
                        }
                    }
                });
            }
        });
    } else {
        console.log("Error: there's no connection to the database.");
        callback({
            status: "error",
            message: "Couldn't connect to the database."
        });
    }
}