export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
  Category.associate = (model) => {
    Category.hasMany(model.Book, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };

  return Category;
};
