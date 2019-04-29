'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title:{
      type:DataTypes.STRING

    },
    description : {
      type: DataTypes.TEXT,
  },
  price: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  imageUrl: {
      type: DataTypes.STRING,
  },
  },

 {});

  Item.associate = models => {
    Item.belongsTo(models.Category, { onDelete: 'CASCADE' })
    Item.belongsTo(models.User, {  as: 'userfkey', foreignKey: 'owner', onDelete: 'CASCADE'})
  };
  return Item;
};