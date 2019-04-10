const db = require('../config/database')
const Sequelize = require('sequelize')

const User = db.define('User', {
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique:(req,res,value ) => {
                if (value) {
                    User.findAll({
                        where : {
                            email : value
                        }
                    }).then(user => {
                        if (user) {
                            res.send({message:'Email already exists'})
                            // throw new Error('Email already exists')
                        }})
        }}},
    },
    firstName: {
        type: Sequelize.STRING(20),
    },
    lastName: {
        type: Sequelize.STRING(20),
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
)

User.associate = models => {
    user.hasMany(models.category, {
        foreignKey: 'userId',
    });
};

module.exports = User