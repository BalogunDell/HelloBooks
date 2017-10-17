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
  });

  borrowedbooks.associate = (models) => {
    borrowedbooks.belongsTo(models.users, { foreignKey: 'userid', onDelete: 'CASCADE' });
    borrowedbooks.belongsTo(models.books, { foreignKey: 'bookid', onDelete: 'CASCADE' });
  };
  return borrowedbooks;
};

export default borrowedbook;
