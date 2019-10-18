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

            renderSidebar();
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
            console.log("Rendered: template '" + template_name + "'");
        });
    }

    /**
     * Renders the sidebar and setup its bindings.
     * 
     * @param {*} data Extra data for the template rendering.
     */
    function renderSidebar(data) {

        // Download the template and render it
        $.get("/templates/" + app.info.templates.sidebar, function (template) {

            $("#" + app.ids.main_sidebar).replaceWith(ejs.render(template, data));

            // Ready: now setup the bindings for the sidebar links
            $("a.nav-link").on("click", function (event) {

                // Ignore the default click
                event.preventDefault();

                // Get the 'data-action' parameter and launch it
                if (event.currentTarget) {
                    let action_id = event.currentTarget.dataset["action"];
                    pub.doAction(action_id);
                }
            });
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
     * Do some application pre-defined action.
     * 
     * 'Actions' are defined on the 'app.info' structure, and they're launched
     * by the sidebar menu entries or other global buttons.
     * 
     * @param {string} action_id The registered action to run.
     * 
     */
    pub.doAction = function (action_id) {

        // Get the action entry
        let actions_list = app.info.actions[action_id];

        if (typeof actions_list === "undefined") {
            console.log("Warning: action '" + action_id + " not found.");
            return;
        } else if (!Array.isArray(actions_list)) {
            // Convert the object/string to an array.
            action_list = [action_list];
        }

        // Select the "thing to do"
        actions_list.forEach((action_info) => {
            if (action_info.action === "load_template") {
                if (action_info.data) {
                    pub.openPart(action_info.template, action_info.data);
                } else {
                    pub.openPart(action_info.template);
                }
            } else if (action_info.action === "update_sidebar") {
                pub.selectSidebarEntry(action_info.select_section);
            }
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
     * Selects a menu entry in the Sidebar.
     * 
     * @param {string} entry_id The menu entry ID.
     */
    pub.selectSidebarEntry = function (entry_id) {

        let li_id = undefined;

        // First, let's look for the sidebar entry and get its "li_id"
        app.info.sidebar.forEach(sidebar_entry => {
            if (sidebar_entry.id === entry_id) {
                li_id = sidebar_entry.li_id;
            }
        });

        // Found
        if (li_id) {
            $("#" + app.ids.main_sidebar + " li.nav-item.active").removeClass("active");
            $("#" + li_id).addClass("active");
        }
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
