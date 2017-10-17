
const categoriesModel = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        args: true,
        msg: 'This category exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Field cannot be empty'
        },
        is: {
          args: /(\D+)+/gi,
          msg: 'Category should be words'
        },
        not: {
          args: /(\s+)+/gi,
          msg: 'Category should be words separated with -'
        },
        len: {
          args: [4, 30],
          msg: 'Category should between 4-30 characters long'
        }
      }
    }
  });
  categories.associate = (model) => {
    categories.hasMany(model.books, {
      foreignKey: 'categoryid',
      onDelete: 'CASCADE'
    });
  };

  return categories;
};
export default categoriesModel;
