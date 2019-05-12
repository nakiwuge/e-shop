module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,},
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
    },
    isSuperAdmin:{
      type: DataTypes.BOOLEAN,
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
    },
    isSeller:{
      type: DataTypes.BOOLEAN,
    },
    isBuyer:{
      type: DataTypes.BOOLEAN,
    },
  }, {});
  User.associate = models => {
    User.hasMany(models.Item, {foreignKey: 'owner'});
  };
  return User;
};