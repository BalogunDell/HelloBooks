const borrowedbook = (sequelize, DataTypes) => {
  const borrowedbooks = sequelize.define('borrowedbooks', {

    userid: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },

    bookid: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'books',
        key: 'id'
      }
    },
    dateborrowed: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now()
    },
    expectedreturndate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now()
    },
    returnstatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    approvedreturn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        borrowedbooks.belongTo(models.users, { foreignKey: 'userid', as: 'user' });
        borrowedbooks.belongTo(models.books, { foreignKey: 'bookid', as: 'book' });
      }
    },
  });
  return borrowedbooks;
};

export default borrowedbook;
