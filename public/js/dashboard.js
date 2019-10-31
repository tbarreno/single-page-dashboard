/**
 * Dashboard component for the UI.
 */

/**
 * The dashboard component.
 * 
 * This is the main application body: it renders the page structure and
 * manages the user actions (navigation, login, etc.).
 * 
 * It uses the "Revealing Module Pattern", 
 */
let dashboard = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
     * Dashboard rendering.
     * 
     * This function uses the application configuration for render the user's
     * dashboard components.
     * 
     */
    pub.run = function () {
        // General application setup (title)
        document.title = i18n("application.title", app.info.title);

        // Render the page
        renderDashboard();
    }

    /**
     * Renders the basic structure (main DIVs) first. Then, renders the
     * Sidebar, Navigation bar and home page.
     */
    function renderDashboard(data = {}) {
        // Download the template and render it
        $.get("/templates/skel.html", function (template) {

            $("body").html(ejs.render(template, data));

            app.sidebar.render();
            renderNavbar();

            renderPart("home", app.ids.main_content);
        });
    }

    /**
     * Renders a partial HTML on a given element.
     * 
     * @param {string} template_name Body ID.
     * @param {string} divId Body ID.
     * @param {Object} data Data .
     */
    function renderPart(template_name, divId, data = {}) {

        // The template_name could be the raw filename or the name
        // of a "registered" template (in 'app.info.templates').
        let template_file = template_name;

        if (app.info.templates[template_name]) {
            template_file = "/templates/" + app.info.templates[template_name];
        }

        // Download the template and render it
        $.get(template_file, function (template) {
            $("#" + divId).replaceWith(ejs.render(template, data));
        });
    }

    /**
     * Renders the navigation bar and setup its bindings.
     */
    function renderNavbar(data) {

        // Download the template and render it
        $.get("/templates/" + app.info.templates.navbar, function (template) {
            $("#" + app.ids.main_navbar).replaceWith(ejs.render(template, data));
        });
    }


    /**
     * Opens a page part on the main content section and enables the corresponding
     * section/button on the sidebar menu.
     * 
     * @param {string} part_name Name or ID of the part (i.e. the template).
     * @param {data} data Extra parameters for the template rendering.
     */
    pub.openPart = function (part_name, data = {}) {

        // Just render the content
        renderPart(part_name, app.ids.main_content, data);
    }

    /**
     * Exposes the public methods.
     */
    return pub;

})();

// Attach the dashboard to the global application variable
app.dashboard = dashboard;

// Launch the dashboard on application startup
app.start = function () {
    app.dashboard.run();
};
