const Sequelize = require('sequelize')
const db = require('../config/database')

const category = db.define('category', {
    name:{
      type:Sequelize.STRING,
      allowNull: false,
  }});
module.exports = category