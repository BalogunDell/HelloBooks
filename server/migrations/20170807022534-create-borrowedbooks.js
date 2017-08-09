module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('borrowedbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      bookid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'books',
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
    return queryInterface.dropTable('borrowedbooks');
  }
};
