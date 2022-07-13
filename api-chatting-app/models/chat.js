'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat.belongsTo(models.user, {
        as: "senderUser",
        foreignKey: {
          name: "sender",
        },
      });
      chat.belongsTo(models.user, {
        as: "receiverUser",
        foreignKey: {
          name: "receiver",
        },
      });
    }
  }
  chat.init({
    message: DataTypes.TEXT,
    sender: DataTypes.INTEGER,
    receiver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};