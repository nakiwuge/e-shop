module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING(50),
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
        type: DataTypes.STRING(20),
    },
    lastName: {
        type: DataTypes.STRING(20),
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

  }, {});
  User.associate = models => {
    User.hasMany(models.Item, {foreignKey: 'owner'})
  };
  return User;
};