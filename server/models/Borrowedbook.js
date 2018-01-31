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
  });

  BorrowedBook.associate = (models) => {
    BorrowedBook.belongsTo(models.User,
      { foreignKey: 'userId', onDelete: 'CASCADE' });
    BorrowedBook.belongsTo(models.Book,
      { foreignKey: 'bookId', onDelete: 'CASCADE' });
  };
  return BorrowedBook;
};
