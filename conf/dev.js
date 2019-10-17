//
// Configuration for Development environment
//

module.exports = {
    // Database connection
    db: {
        type: "mongodb",
        hostname: "localhost",
        port: 27017,
        database: "testdb",
        options: {
            native_parser: true
        }
    },

    // Default port for the Node server
    server: {
        port: 3000
    },

    // Name for the environment (for 'morgan' logs)
    env: "dev"
};
