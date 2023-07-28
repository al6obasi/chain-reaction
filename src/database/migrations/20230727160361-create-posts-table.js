'use strict'

const { Sequelize } = require('sequelize')

/**
 * Migration for creating the 'posts' table.
 * @param {object} options - Options object containing the context with queryInterface.
 */
module.exports = {
    /**
     * Run the 'up' migration.
     * @param {object} options.context - Query interface context.
     */
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('posts', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
        await queryInterface.dropTable('posts')
    },
}
