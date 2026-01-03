const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('rewards', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'games', key: 'id' },
        onDelete: 'CASCADE',
      },
      reward_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      required_score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('rewards')
  }
}