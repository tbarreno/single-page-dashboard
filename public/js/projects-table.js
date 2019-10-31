/**
 * The project's table module.
 * 
 * This module controls the project list: it gets the data from the server and
 * updates the table content. It also controls the project addition and deletion
 * management.
 */

let projects_table = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
     * Internal variables.
     */
    var vars = {
        tableDivId: undefined
    }

    /**
     * Initialization.
     * 
     * @param {string} id - The HTML DIV ID where the table must be rendered.
     */
    pub.init = function (divId) {
        vars.tableDivId = divId;

        // Loads the project API client
        app.getApiClient("projects-api", "1.0", (client_module) => {
            vars.api_client = client_module;

            console.log("API Client ready...");
            console.log(vars.api_client.getProjects());
        });
    };

    /**
     * Renders the table.
     */
    pub.render = function () {
        console.log("URL : " + resourceUrl);
    }

    /**
     * Exposes the public methods.
     */
    return pub;
})();

// Attach the this library to the global application variable
if (typeof app.projects_table === "undefined") {
    app.projects_table = projects_table;
}
