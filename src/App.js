const {
    isOperationalError,
    logError,
} = require('./helpers/errorHandler')
const Database = require('./database')
const config = require('./database/config.js')
const { handler } = require('./routes')
const http = require('http')

/**
 * The singleton instance of the App class for initializing the application and database.
 */
class App {
    /**
     * Creates the singleton instance of the App class.
     */
    constructor() {
        if (App.instance) {
            return App.instance
        }

        this.#initialize()
        App.instance = this

        return this
    }

    /**
     * Initializes the application and database.
     * @private
     */
    async #initialize() {
        await this.#initializeDB()
        this.#initializeServer()
    }

    /**
     * Initializes the database.
     * @private
     */
    async #initializeDB() {
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

    /**
     * Creates and initializes the HTTP server.
     * @private
     */
    #initializeServer() {
        const PORT = process.env.APP_PORT || 3000

        // Create the server
        this.server = http.createServer((req, res) => {
            // Attach the database instance to the request object for easy access in route handlers
            req.db = this.db
            // Pass the request and response objects to the route handler
            handler(req, res)
        })

        // Start the server
        this.server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

        /**
         * Event listener for unhandled promise rejections.
         * Throws the error to ensure it gets logged and handled properly.
         * @param {Error} error - The unhandled rejection error.
         */
        process.on('unhandledRejection', (error) => {
            logError(error)
            throw error
        })

        /**
         * Handle uncaught exceptions and log errors.
         * If the error is not operational, exit the process.
         */
        process.on('uncaughtException', (error) => {
            logError(error)

            if (!isOperationalError(error)) {
                process.exit(1)
            }
        })
    }
}

// Export the singleton instance to use throughout the application
module.exports = new App()
