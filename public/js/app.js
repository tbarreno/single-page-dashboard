/**
 * Base application module.
 * 
 * This module is responsible for loading the application configuration,
 * seting up the I18N and other modules, and loading the main component
 * (the Dashboard).
 */

/**
 * The global application state and configuration instance (object).
 * 
 * It contains the initialization part, global configuration about
 * the client application and some common/basic functions.
 */
var app = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
      * Dashboard initialization.
      * 
      * It downloads the application configuration object from the
      * server and then runs the setup function.
      * 
      */
    pub.init = function () {

        // Global component IDs
        app.ids = {};

        // Session info (user data, auth token, etc.)
        app.session = {};

        // API Clients (modules)
        app.clients = {};

        // Get the global application information (configuration)
        // TODO: log something when the info service is not available
        $.getJSON("/app/info", setupApplication);
    }

    /**
     * Prepare the required dependencies (i18n and user settings).
     * 
     * @param {app_info} object Application configuration (object)
     */
    function setupApplication(app_info) {

        // Save the application info
        pub.info = app_info;

        // Setup the language settings
        setupLanguage();

        // Load the dashboard modules and run them. Then, start the application.
        if (app.info.modules) {
            pub.loadScript(app.info.modules, function () { app.start(); });
        }
    }

    /**
     * Setup the language: detect the language settings and download
     * the corresponding I18N resource.
     */
    function setupLanguage() {
        // Set the default language for the UI
        app.ui = { lang: app.info.default_language };

        // Check for the navigator language preferences
        if (navigator.languages) {
            navigator.languages.forEach(function (lang) {
                if (app.info.languages[lang]) {
                    // Language matched
                    app.ui.lang = lang;
                }
            });
        }

        // Get the I18N file and render the dashboard
        app.ui.lang_file = app.info.languages[app.ui.lang];

        $.getJSON(app.ui.lang_file, (lang_file) => {
            // Load the language translation file into the I18N library
            i18n.translator.add(lang_file);
        });
    }

    /**
     * Loads some scripts.
     * 
     * This function loads the scripts/libraries and runs them.
     * 
     * @param {string|Array} scripts A list of scripts to load (or just one).
     * @param {function} callback The callback function to run after all the scripts are loaded.
     */
    pub.loadScript = function (scripts, callback) {

        let get_promises = [];

        if (typeof scripts === "string") {

            // Just one script
            get_promises.push($.getScript(scripts));

        } else if (Array.isArray(scripts)) {

            // An array of scripts
            scripts.forEach(function (script) {
                get_promises.push($.getScript(script));
            });
        }

        // When all scripts are loaded...
        $.when(...get_promises).done(function () {
            if (typeof callback === "function") {
                callback();
            }
        });
    }

    /**
     * Gets an API module client by name and version.
     * 
     * @param {string} api_name The API client module name as stated in the 'api_info' configuration.
     * @param {function} callback The callback function to run after the API client module is loaded.
     * @param {function} error_callback The callback function if the API client is not found.
     */
    pub.getApiClient = function (api_name, api_version, callback, error_callback) {

        // Look for the API name and version in the 'app_info' configuration
        let api_lookup = app.info.apis.filter((api) => {
            return api.name === api_name && api.version === api_version;
        });

        if (api_lookup.length == 0) {
            // No such API in the definition...
            console.log("Warning: API client for '" + api_name + ":" + api_version + "' not found.");
            if (typeof error_callback === "function") {
                error_callback();
            }
        } else if (api_lookup.length > 1) {
            // ups... more than one api match...
            // Let's show a warning and just take the first one
            console.log("Warning: more than one API client for '" + api_name + ":" + api_version + "'.");
        }

        // Get the first restult
        let api_definition = api_lookup[0];

        // Check for the client module
        if (api_definition.hasOwnProperty("client")) {
            // Already loaded
            if (typeof callback === "function") {
                callback(api_definition.client);
            }
        } else {
            // Load the script and runs the callback
            let api_script = api_definition.script;

            pub.loadScript(api_script, () => {
                if (typeof callback === "function") {
                    callback(api_definition.client);
                }    
            });
        }
    }

    /**
     * Registers an API client.
     * 
     * API client modules must provide a 'supported_apis' array with the list of
     * APIs and versions that the module supports.
     * 
     * This method stores the module under the 'app.info.apis' structure as the
     * 'client' property.
     * 
     * @param {object} api_client The client module.
     */
    pub.registerApiClient = function (api_client) {

        // Check for the 'supported_apis' array
        if (Array.isArray(api_client.supported_apis)) {
            api_client.supported_apis.forEach((supported_api) => {

                // Look for the API name and version in the 'app_info' configuration
                let api_lookup = app.info.apis.filter((api) => {
                    // Just one version
                    if (typeof supported_api.version === "string") {
                        return api.name === supported_api.name && api.version === supported_api.version;
                    } else if (Array.isArray(supported_api.versions)) {
                        // A list of versions (do a 'find')
                        return api.name === supported_api.name &&
                            (supported_api.versions.find((version) => { return version === api.version }));
                    }
                });

                if (api_lookup.length == 0) {
                    // Not found... it may be ok anyway...
                } else {
                    // Set the 'client' property
                    let api_definition = api_lookup[0];
                    api_definition.client = api_client;

                    // Initialize the client (optional)
                    if (typeof api_client.init === "function") {
                        api_client.init(api_definition);
                    }
                }
            });
        }
    }

    /**
     * The start function.
     * 
     * This function must be defined by the dashboard/main library.
     */
    pub.start = function () { console.log("app.start();") };

    /**
     * Exposes the public methods.
     */
    return pub;

})();

// Setup the Dashboard component
$(document).ready(function () {

    // Starts the application
    app.init();

});
