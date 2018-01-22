
const CategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
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
  category.associate = (model) => {
    category.hasMany(model.book, {
      foreignKey: 'categoryid',
      onDelete: 'CASCADE'
    });
  };

  return category;
};
export default CategoryModel;
