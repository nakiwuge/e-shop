module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = models => {
    Category.hasMany(models.Item);
  };
  return Category;
};