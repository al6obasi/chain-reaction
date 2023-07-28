/**
 * Post Model definition.
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The DataTypes object.
 * @returns {import('sequelize').Model} The Post model.
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * The Post model definition.
     * @type {import('sequelize').Model}
     */
    const Post = sequelize.define(
        'post',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        },
    )

    return Post
}
