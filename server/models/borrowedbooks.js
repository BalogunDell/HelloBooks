const borrowedbook = (sequelize, DataTypes) => {
  const borrowedbooks = sequelize.define('borrowedbooks', {
    dateborrowed: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expectedreturndate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnstatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    approvedreturn: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // borrowedbook.hasMany(borrowedbook);
        borrowedbooks.belongTo(models.users, { foreignKey: 'userid', as: 'user' });
        borrowedbooks.belongTo(models.books, { foreignKey: 'bookid', as: 'book' });
      }
    },
  });
  return borrowedbooks;
};

export default borrowedbook;
