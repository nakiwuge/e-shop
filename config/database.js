const Sequelize = require('sequelize')

//connect to db
module.exports = new Sequelize('postgres://miriam:miriam@localhost/eshop')