const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()

/**
 * Database configuration object for different environments.
 */
module.exports = {
    /**
     * Development environment configuration.
     */
    development: {
        database: process.env.DB_SCHEMA,
        dialect: 'postgres',
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        define: {
            underscored: true,
        },
    },
    /**
     * Production environment configuration.
     * Add specific production settings if needed.
     */
    production: {},
}
