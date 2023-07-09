const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ApiToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApiToken.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        tableName: "Users",
        key: 'id'
      },
      onDelete: "cascade"
    },
    token: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ApiToken',
  });
  return ApiToken;
};