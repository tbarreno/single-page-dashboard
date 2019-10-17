/**
 * Common functions for the application.
 */

let common = (function () {
    /**
     * Public interface and properties.
     */
    var pub = {};

    /**
     * Generates a random ID for the components (with an optional prefix).
     * 
     * @param {string} prefix - A prefix for the ID.
     * @returns A unique ID that can be used in HTML elements.
     */
    pub.newId = function (prefix = "") {
        return prefix + '-' + (Math.random(100) * 100000).toString(32).replace(".", "-");
    };

    /**
     * Exposes the public methods.
     */
    return pub;
})();

// Attach the this library to the global application variable
app.common = common;
