const Sequelize = require('sequelize')
const db = require('../config/database')

const category = db.define('category', {
    name:{
      type:Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 50],
          msg: "Category name should have a minimun of 3 and a maximum of 50 characters"
        }
      }
  },
});

category.associate = models => {
  category.belongsTo(models.user);
};
module.exports = category