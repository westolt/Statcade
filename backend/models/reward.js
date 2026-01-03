const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Reward extends Model {}

Reward.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'games', key: 'id' },
    onDelete: 'CASCADE',
  },
  rewardName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requiredScore: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reward'
})

module.exports = Reward