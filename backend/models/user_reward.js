const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class UserReward extends Model {}

UserReward.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  rewardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'rewards', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user_reward'
})

module.exports = UserReward