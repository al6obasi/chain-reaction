/**
 * User Model definition.
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The DataTypes object.
 * @returns {import('sequelize').Model} The User model.
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * The User model definition.
     * @type {import('sequelize').Model}
     */
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                isEmail: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        },
    )

    return User
}
