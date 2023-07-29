'use strict'

const { Sequelize } = require('sequelize')

/**
 * Migration for creating the 'users' table.
 * @param {object} options - Options object containing the context with queryInterface.
 */
module.exports = {
    /**
     * Run the 'up' migration.
     * @param {object} options.context - Query interface context.
     */
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
        })
    },

    /**
     * Run the 'down' migration.
     * @param {object} options.context - Query interface context.
     */
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users')
    },
}
