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

        // Load the dashboard and runs it. Then loads
        // the additional scripts.
        if (app.info.libs) {
            pub.loadScript(app.info.libs, function () { app.start(); });
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
            get_promises.push($.getScript(script));

        } else if (Array.isArray(scripts)) {

            // An array of scripts
            scripts.forEach(function (script) {
                get_promises.push($.getScript(script));
            });
        }

        // When all scripts are loaded...
        $.when(...get_promises).done(function () {
            callback();
        });
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
