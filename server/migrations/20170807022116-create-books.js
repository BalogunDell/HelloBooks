
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoryid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visibility: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('books');
  }
};
