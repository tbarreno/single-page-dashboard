/**
 * Application configuration.
 * 
 * This module defines the environment independent configuration.
 */

module.exports = {

    // User interface
    // This configuration is provided directly to the Dashboard UI component
    ui: {
        // Application title
        title: "Single Page Dashboard",

        // Application name (over the Sidebar)
        name: "Simple TO-DO",

        // Link for the application name
        link: "/",

        // Application functions/libraries/modules
        // These libraries are loaded before the startup (one of them
        // must define the 'app.start()' function)
        modules: [
            "js/common.js",
            "js/dashboard.js",
            "js/sidebar.js"
        ],

        // I18N : a map with the language key and the traduction file
        languages: {
            en: "/i18n/en.json"
        },

        // The default language (if the browser's setting is not available)
        default_language: "en",

        // Home page structure
        home: {

        },

        // Templates names and files
        templates: {
            sidebar: "sidebar.html",
            navbar: "navbar.html",
            home: "home.html",
            projects: "projects.html",
            api: "api.html",
            about: "about.html"
        },

        // Sidebar menu (default one: for unauthenticated users)
        sidebar: [{
            id: "home",
            icon: "home",
            text: "sb.home",
            data: {
                action: "load_template",
                template: "home"
            }
        }, {
            id: "projects",
            icon: "work",
            text: "sb.projects",
            data: {
                action: "load_template",
                template: "projects"
            }
        }, {
            id: "api",
            icon: "library_books",
            text: "sb.api",
            data: {
                action: "load_template",
                template: "api"
            }
        }, {
            id: "about",
            icon: "help",
            text: "sb.about",
            data: {
                action: "load_template",
                template: "about"
            }
        }],

        // APIs provided (versions, clients and endpoints)
        apis: [
            {
                name: "projects-api",
                version: "1.0",
                base: "/apiv1",
                script: "js/api/projects-1.0.js"
            }
        ]
    }
};
