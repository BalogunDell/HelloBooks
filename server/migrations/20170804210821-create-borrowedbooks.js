module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('borrowedbooks', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    bookid: {
      type: Sequelize.INTEGER,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    dateborrowed: {
      type: Sequelize.DATE,
      allowNull: false
    },
    expectedreturndate: {
      type: Sequelize.DATE,
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('borrowedbooks')
};
