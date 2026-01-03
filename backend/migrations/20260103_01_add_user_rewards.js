const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('user_rewards', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            reward_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'rewards', key: 'id' },
                onDelete: 'CASCADE',
            },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('user_rewards')
    },
}