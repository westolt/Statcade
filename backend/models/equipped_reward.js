const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class EquippedReward extends Model {}

EquippedReward.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id'},
        onDelete: 'CASCADE',
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'game', key: 'id'},
        onDelete: 'CASCADE'
    }
    ,
    rewardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reward', key: 'id'},
        onDelete: 'CASCADE',
    },
    slot: {
        type: DataTypes.ENUM(
            'GAME_FONT',
            'USERNAME_FONT'
        ),
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'equipped_reward',
})

module.exports = EquippedReward