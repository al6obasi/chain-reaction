const Database = require('./index.js')
const config = require('./config.js')

// Create an instance of the Database class based on the current environment configuration
const db = new Database(config[process.env.APP_ENVIRONMENT])

// Create an instance of Umzug with the provided migration path
const umzug = db.umzugInstance('migrations/*.js')

// Export the Umzug instance for other modules to use
exports.umzug = umzug

// If this file is executed directly (not imported as a module)
if (require.main === module) {
    // Run Umzug CLI if executed directly from the command line
    umzug.runAsCLI()
}
