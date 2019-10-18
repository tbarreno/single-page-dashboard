/**
 * Application configuration.
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
        libs: [
            "js/dashboard.js",
            "js/common.js"
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

        // Global actions that the Dashboard should take care
        actions: {
            // Each action has a list of "things to do"
            // For example: load a template and select it section on the sidebar
            load_home: [{
                action: "load_template",
                template: "home"
                // Optional data = {} for the rendering
            }, {
                action: "update_sidebar",
                select_section: "home"
            }],
            load_projects: [{
                action: "load_template",
                template: "projects"
            }, {
                action: "update_sidebar",
                select_section: "projects"
            }],
            load_api: [{
                action: "load_template",
                template: "api"
            }, {
                action: "update_sidebar",
                select_section: "api"
            }],
            load_about: [{
                action: "load_template",
                template: "about"
            }, {
                action: "update_sidebar",
                select_section: "about"
            }]
        },

        // Sidebar menu (default one: for unauthenticated users)
        sidebar: [{
            id: "home",
            icon: "home",
            text: "sb.home",
            action: "load_home"
        }, {
            id: "projects",
            icon: "work",
            text: "sb.projects",
            action: "load_projects"
        }, {
            id: "api",
            icon: "library_books",
            text: "sb.api",
            action: "load_api"
        }, {
            id: "about",
            icon: "help",
            text: "sb.about",
            action: "load_about"
        }],
    },

    // APIs provided (versions, clients and endpoints)
    apis: [
        {
            name: "execution-api",
            version: "1.0",
            base: "/apiv1",
            client: "nepoc-1.0.js",
            endpoints: {
                users: "/users"
            }
        }
    ]
};
