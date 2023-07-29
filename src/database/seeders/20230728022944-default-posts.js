'use strict'

const { generatePosts } = require('../../helpers/utils')

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
            generatePosts(),
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
