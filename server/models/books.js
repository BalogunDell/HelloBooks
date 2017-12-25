const Book = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A book with this isbn exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Isbn field cannot be empty'
        },
        len: {
          args: [6, 9],
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
          msg: 'Pages field cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Pages must be a number'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Author field cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'Author can only contain strings'
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
          msg: 'Year cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Year must be a number'
        },
        len: {
          args: [4],
          msg: 'Year is invalid'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title field cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'Title can only contain strings'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description field cannot be empty'
        },
        is: {
          args: /(\w)+/i,
          msg: 'Description only contain strings'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Quantity field cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Quantity must be a number'
        }
      }
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image cannot be empty'
        },
        is: {
          args: /(\w)/i,
          msg: 'Image url can only contain strings'
        }
      }
    },
    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Select a book to upload'
        },
        is: {
          args: /(\w)/i,
          msg: 'Book must be a file'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (bookInstance) => {
        // if (bookInstance.isbn.indexOf('#') !== -1) {
        //   bookInstance = bookInstance.isbn.substring(1);
        //   bookInstance.isbn = `#${bookInstance.isbn}`;
        //   return bookInstance;
        // }
        bookInstance.isbn = `#${bookInstance.isbn}`;
        return bookInstance;
      },
    }
  });

  book.associate = (model) => {
    book.hasMany(model.borrowedbook, {
      foreignKey: 'bookid',
    });
    book.belongsTo(model.category, {
      foreignKey: 'categoryid',
      onDelete: 'CASCADE'
    });
  };
  return book;
};
export default Book;
