const book = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Isbn cannot be empty'
        },
        len: {
          args: [6 - 9],
          msg: 'Isbn should be 6 and 9 digits'
        }
      }
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'pages cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'pages must be a number'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'author cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'author can only contain strings'
        },
        len: {
          args: [3, 50],
          msg: 'Author name should be more than 3 characters long'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'year cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'year must be a number'
        },
        len: {
          args: [4],
          msg: 'year is invalid'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'title can only contain strings'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'description cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'description only contain strings'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'quantity cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'quantity must be a number'
        }
      }
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'category cannot be empty'
        },
        is: {
          args: /(\w)/i,
          msg: 'category only contain strings'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'image cannot be empty'
        },
        is: {
          args: /(\w)/i,
          msg: 'image url can only contain strings'
        }
      }
    }
  }, {
    classMethods: {
      associate(model) {
        // associations can be defined here
        books.belongTo(model.borrowedbooks, {
          foreignKey: 'bookid',
          as: 'borrowedbooks'
        });
        books.belongTo(model.categories, {
          foreignKey: 'categoryid',
          as: 'categories'
        });
      }
    },
    hooks: {
      beforeCreate: (bookInstance) => {
        bookInstance.isbn = `#${bookInstance.isbn}`;
        return bookInstance;
      },
    }
  });
  return books;
};
export default book;
