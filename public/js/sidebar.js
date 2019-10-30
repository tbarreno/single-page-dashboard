/**
 * The SideBar component..
 */

let sidebar = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
     * Renders the sidebar and setup its bindings.
     * 
     * @param {*} data Extra data for the template rendering.
     */
    pub.render = function (data) {

        // Download the template and render it
        $.get("/templates/" + app.info.templates.sidebar, function (template) {

            $("#" + app.ids.main_sidebar).replaceWith(ejs.render(template, data));

            // Ready: now setup the bindings for the sidebar links
            $("a.nav-link").on("click", function (event) {

                // Ignore the default click
                event.preventDefault();

                // Call the action with the current attribute dataset
                if (event.currentTarget) {
                    pub.doAction(event.currentTarget.dataset);
                }
            });
        });
    }

    /**
     * Runs an action from a sidebar click.
     * 
     * @param {string} data_attrs Data attributes from the menu link.
     * 
     */
    pub.doAction = function (data_attrs) {

        let action_id = data_attrs["action"];

        // 'load_template': gets the content template, renders it and highlights the
        // sidebar menu entry.
        //
        // The template name comes from the 'data-template' attribute on the 'a' link.
        //
        // The 'data-highlight' controls when the menu entry is highlighted; it can have a
        // menu entry ID (for submenus, favourites, etc.), 'true' for highlighting
        // the current entry and 'false' for do nothing.
        //
        if (action_id === "load_template") {
            // We need the template name 
            let template = data_attrs["template"];

            let highlight_menu_entry = (data_attrs.hasOwnProperty("highlight")) ? data_attrs.highlight : true;

            if (template) {
                // Call the Dashboard to load the template.
                app.dashboard.openPart(template);
            } else {
                console.log("[SideBar] Missing the template to render.");
            }

            if (typeof highlight_menu_entry === "boolean") {
                if (highlight_menu_entry) {
                    // ...well... I'm not sure how to get the menu entry ID at this moment...
                    // Just take the template name as the ID...
                    pub.selectSidebarEntry(template);
                }
            } else if (typeof highlight_menu_entry === "string") {
                // Select the specified menu entry
                pub.selectSidebarEntry(highlight_menu_entry);
            }
        }
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

// Attach the this library to the global application variable
app.sidebar = sidebar;
