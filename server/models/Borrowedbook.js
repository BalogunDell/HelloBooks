const Borrowedbook = (sequelize, DataTypes) => {
  const borrowedbook = sequelize.define('borrowedbook', {

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
  });

  borrowedbook.associate = (models) => {
    borrowedbook.belongsTo(models.user, { foreignKey: 'userid', onDelete: 'CASCADE' });
    borrowedbook.belongsTo(models.book, { foreignKey: 'bookid', onDelete: 'CASCADE' });
  };
  return borrowedbook;
};

export default Borrowedbook;
