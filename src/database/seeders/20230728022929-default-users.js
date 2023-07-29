const AuthService = require('../../services/AuthService')

/**
 * Seed data for the users table.
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
    /**
     * Add seed data to the users table.
     * @param {object} options.context - Query interface context.
     * @returns {Promise<void>}
     */

    async up({ context: queryInterface }) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    email: 'test@test.com',
                    username: 'test',
                    password:
                        await AuthService.hashPassword(
                            '1234',
                        ),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    email: 'test2@test.com',
                    username: 'test2',
                    password:
                        await AuthService.hashPassword(
                            '4321',
                        ),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        )
    },

    /**
     * Remove seed data from the users table.
     * @param {object} options.context - Query interface context.
     * @returns {Promise<void>}
     */
    async down({ context: queryInterface }) {
        await queryInterface.bulkDelete('users', null, {})
    },
}
