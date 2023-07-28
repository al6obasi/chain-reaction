const { DataTypes, Sequelize } = require('sequelize')
const { SequelizeStorage, Umzug } = require('umzug')
const PostModel = require('./models/post.js')
const UserModel = require('./models/user.js')

/**
 * Database Singleton Class for managing database connections, migrations, and seeders.
 */
class Database {
    /**
     * Create or return an instance of the Database class.
     * @param {object} config - Sequelize configuration options.
     */
    constructor(config) {
        if (!Database.instance) {
            this.sequelize = new Sequelize({
                ...config,
                dialect: 'postgres',
            })

            this.models = {
                Post: PostModel(this.sequelize, DataTypes),
                User: UserModel(this.sequelize, DataTypes),
            }

            this.defineAssociations()

            Database.instance = this
        }

        return Database.instance
    }

    /**
     * Create an instance of Umzug with the provided migration or seeder path.
     * @param {string} path - Path to the migrations or seeders files.
     * @returns {Umzug} Umzug instance for running migrations or seeders.
     * @throws {Error} If an error occurs while creating Umzug instance.
     */
    umzugInstance(path) {
        try {
            return new Umzug({
                context: this.sequelize.getQueryInterface(),
                migrations: {
                    glob: [path, { cwd: __dirname }],
                },
                storage: new SequelizeStorage({
                    sequelize: this.sequelize,
                }),
                logger: console,
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * Define associations between Sequelize models.
     */
    defineAssociations() {
        this.models.User.hasMany(this.models.Post)
        this.models.Post.belongsTo(this.models.User)
    }

    /**
     * Initialize the database by authenticating, running migrations, and seeders.
     */
    async initialize() {
        await this.authenticate()
        await this.runMigrate()
        await this.runSeeders()
    }

    /**
     * Authenticate the database connection.
     */
    async authenticate() {
        try {
            await this.sequelize.authenticate()
            console.log(
                'Database connection has been established successfully.',
            )
        } catch (error) {
            console.error(
                'Unable to connect to the database:',
                error,
            )
        }
    }

    /**
     * Run pending migrations.
     */
    async runMigrate() {
        try {
            await this.umzugInstance('migrations/*.js').up()
            console.log(
                'Migrations have been executed successfully.',
            )
        } catch (error) {
            console.error(
                'Error running migrations:',
                error,
            )
        }
    }

    /**
     * Run pending seeders.
     */
    async runSeeders() {
        try {
            await this.umzugInstance('seeders/*.js').up()
            console.log(
                'Seeders have been executed successfully.',
            )
        } catch (error) {
            console.error('Error running seeders:', error)
        }
    }
}

module.exports = Database
