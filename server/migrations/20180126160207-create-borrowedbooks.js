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
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Books',
          key: 'id'
        }
      },
      dateBorrowed: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      expectedReturnDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      returnStatus: {
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
