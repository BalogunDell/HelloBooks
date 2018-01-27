module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('BorrowedBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id'
        }
      },
      dateborrowed: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      expectedreturndate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      returnstatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      approvedreturn: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('BorrowedBooks');
  }
};
