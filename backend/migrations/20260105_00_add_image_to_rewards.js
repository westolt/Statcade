const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('rewards', 'image', {
            type: DataTypes.STRING,
            allowNull: true,
        })

        await queryInterface.addColumn('rewards', 'instructions', {
            type: DataTypes.TEXT,
            allowNull: true,
        })
    },
    down: async ({ context: queryInterface}) => {
        await queryInterface.removeColumn('rewards', 'image')
        await queryInterface.removeColumn('rewards', 'instructions')
    }
}