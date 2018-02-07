export default (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {

    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    bookId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Books',
        key: 'id'
      }
    },
    dateBorrowed: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now()
    },
    expectedReturnDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now()
    },
    returnStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  BorrowedBook.associate = (models) => {
    BorrowedBook.belongsTo(models.User,
      { foreignKey: 'userId', onDelete: 'CASCADE' });
    BorrowedBook.belongsTo(models.Book,
      { foreignKey: 'bookId', onDelete: 'CASCADE' });
  };
  return BorrowedBook;
};
