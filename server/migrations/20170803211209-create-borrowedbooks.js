'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('borrowedbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      bookid: {
        type: Sequelize.STRING
      },
      dateborrow: {
        type: Sequelize.DATE
      },
      expectedreturndate: {
        type: Sequelize.DATE
      },
      returnstatus: {
        type: Sequelize.BOOLEAN
      },
      approvedreturn: {
        type: Sequelize.BOOLEAN
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('borrowedbooks');
  }
};