/**
 * Route for the projects.
 */

var express = require("express");

var projects_module = require.main.require("./modules/projects");

var projects_router = express.Router();

/**
 * GET / : returns the list of projects.
 */
projects_router.get("/", function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    projects_module.get_all_projects((data) => {
        res.end(JSON.stringify(data));
    });
})

/**
 * POST / : Adds a project.
 */
projects_router.post("/", function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });

    projects_module.add_project(req.body, (data) => {
        res.end(JSON.stringify(data));
    });
})

/**
 * GET /{id} : Returns a project.
 */
projects_router.get("/:id", function (req, res) {

    let projectId = req.params.id;

    res.writeHead(200, { "Content-Type": "application/json" });

    projects_module.get_project_by_id(projectId, (data) => {
        res.end(JSON.stringify(data));
    });
})

/**
 * PUT /{id} : Updates a project.
 */
projects_router.put("/:id", function (req, res) {

    let projectId = req.params.id;

    res.writeHead(200, { "Content-Type": "application/json" });

    projects_module.update_project(projectId, (data) => {
        res.end(JSON.stringify(data));
    });
})

/**
 * DELETE /{id} : Deletes a project.
 */
projects_router.delete("/:id", function (req, res) {

    let projectId = req.params.id;

    res.writeHead(200, { "Content-Type": "application/json" });

    projects_module.delete_project(projectId, (data) => {
        res.end(JSON.stringify(data));
    });
})

module.exports = projects_router;
