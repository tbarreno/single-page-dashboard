/**
 * Project's module client for version 1.0.
 * 
 * This module contains all the functions to deal with the REST API.
 */

let projects_api_client = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
     * Information about what API versions provides this module.
     * 
     * This module may provide client method for several APIs and versions
     * (specially with minor versions). The 'module_info' structure lists
     * the names and versions that the 'getApiClient()' method will
     * register.
     */
    pub.supported_apis = [{
        name: "projects-api",
        versions: ["1.0"]
    }]

    /**
     * Internal variables.
     */
    var vars = {
        projects_resource: "/projects"
    }

    /**
     * Initialization
     */
    pub.init = function(api_definition) {
        vars.projects_resource = api_definition.base + "/projects";
        console.log("init : url = " + vars.projects_resource);
    }

    /**
     * Gets the projects list.
     * 
     * @param {function} successCallback Callback for success
     * @param {function} errorCallback Callback for errors
     */
    pub.getProjects = function (id, successCallback, errorCallback) {
        request("GET", vars.projects_resource, undefined, successCallback, errorCallback);
    }

    /**
     * Gets a single project information.
     * 
     * @param {string} id The project ID
     * @param {function} successCallback Callback for success
     * @param {function} errorCallback Callback for errors
     */
    pub.getProjectById = function (id, successCallback, errorCallback) {
        let url = vars.projects_resource + "/" + id;
        request("GET", url, undefined, successCallback, errorCallback);
    }

    /**
     * Adds a new project.
     *
     * @param {object} data The project data
     * @param {function} successCallback Callback for success
     * @param {function} errorCallback Callback for errors
     */
    pub.newProject = function (data, successCallback, errorCallback) {
        request("POST", vars.projects_resource, data, successCallback, errorCallback);
    }

    /**
     * Updates a project information.
     * 
     * @param {string} id The project ID
     * @param {object} data The project data
     * @param {function} successCallback Callback for success
     * @param {function} errorCallback Callback for errors
     */
    pub.updateProject = function (id, data, successCallback, errorCallback) {
        let url = vars.projects_resource + "/" + id;
        request("PUT", url, data, successCallback, errorCallback);
    }

    /**
     * Deletes an User
     */
    pub.deleteUser = function (id, successCallback, errorCallback) {
        let url = vars.projects_resource + "/" + id;
        this.request("DELETE", url, undefined, successCallback, errorCallback);
    }

    /**
    * Common request method.
    * 
    * @param {string} method HTTP Method (GET, POST, DELETE, etc.)
    * @param {string} url The request endpoint
    * @param {object} data Optional data for the POST/PUT body
    * @param {function} successCallback Callback for success
    * @param {function} errorCallback Callback for errors
    */
    function request(method, url, data, successCallback, errorCallback) {
        $.ajax({
            method: method,
            url: url,
            data: (data) ? JSON.stringify(data) : undefined,
            accepts: {
                text: "application/json"
            },
            // headers : {
            //   "Authorization" : this.appInfo.authHeader
            // },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            cache: false,
            // success: (data, textStatus, jqXHR) => { successCallback(data, textStatus, jqXHR) },
            // error: (jqXHR, textStatus, errorThrown) => { errorCallback(jqXHR, textStatus, errorThrown) }
            success: successCallback,
            error: errorCallback
        });
    }


    /**
     * Exposes the public methods.
     */
    return pub;
})();

// Registers this client
app.registerApiClient(projects_api_client);
