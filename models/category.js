const Sequelize = require('sequelize')
const db = require('../config/database')

const category = db.define('category', {
    name:{
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === null | value.length < 3) {
            throw new Error("name can't be null ");
          }}
    }
  }});
module.exports = category