'use strict'

/**
 * @typedef {import('sequelize').QueryInterface} SequelizeQueryInterface
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * Run the seed function.
     *
     * @param {Object} params - Parameters object.
     * @param {SequelizeQueryInterface} params.context - The queryInterface provided by Sequelize.
     * @returns {Promise<void>} - A promise that resolves when the seeding is done.
     */
    async up({ context: queryInterface }) {
        await queryInterface.bulkInsert(
            'posts',
            [
                {
                    id: 1,
                    title: 'post1',
                    content: 'post one content',
                    user_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    title: 'post2',
                    content: 'post two content',
                    user_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        )
    },

    /**
     * Revert the seed function.
     *
     * @param {Object} params - Parameters object.
     * @param {SequelizeQueryInterface} params.context - The queryInterface provided by Sequelize.
     * @returns {Promise<void>} - A promise that resolves when the seeding is reverted.
     */
    async down({ context: queryInterface }) {
        await queryInterface.bulkDelete('posts', null, {})
    },
}
