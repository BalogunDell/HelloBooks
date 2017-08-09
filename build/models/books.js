'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var book = function book(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(model) {
        // associations can be defined here
        books.belongTo(model.borrowedbooks, {
          foreignKey: 'bookid',
          as: 'borrowedbooks'
        });
      }
    }
  });
  return books;
};
exports.default = book;