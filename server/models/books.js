const Book = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    isbn: {
      title: DataTypes.STRING,
      allowNull: false
    },
    pages: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });
  return Books;
};
export default Book;
