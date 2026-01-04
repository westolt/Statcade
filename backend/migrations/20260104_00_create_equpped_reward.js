const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('equipped_rewards', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id'},
                onDelete: 'CASCADE',
            },
            game_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: { model: 'games', key: 'id'},
                onDelete: 'CASCADE'
            }
            ,
            reward_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'rewards', key: 'id'},
                onDelete: 'CASCADE',
            },
            slot: {
                type: DataTypes.ENUM(
                    'GAME_FONT',
                    'USERNAME_FONT'
                ),
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        })

        await queryInterface.addConstraint('equipped_rewards', {
            fields: ['user_id', 'game_id', 'slot'],
            type: 'unique',
            name: 'unique_user_game_slot'
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('equipped_rewards')
    }
}

