module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApiTokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users"
          },
          key: 'id'
        },
        onDelete: "cascade"
      },
      token: {
        type:Sequelize.TEXT,
        allowNull: false
      },
      valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ApiTokens');
  }
};
