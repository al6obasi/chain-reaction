const Database = require('./database/index.js')
const config = require('./database/config.js')

/**
 * App class for initializing the application and database.
 */
class App {
    /**
     * Initialize the application and connect to the database.
     */
    async initialize() {
        try {
            this.db = new Database(
                config[process.env.APP_ENVIRONMENT],
            )
            await this.db.initialize()
        } catch (error) {
            console.error(
                'Unable to connect to the database:',
                error,
            )
            throw error
        }
    }
}

// Create an instance of the App class and initialize the application
const app = new App()
app.initialize()
