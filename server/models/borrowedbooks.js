'use strict';
module.exports = function(sequelize, DataTypes) {
  var borrowedbooks = sequelize.define('borrowedbooks', {
    userid: DataTypes.STRING,
    bookid: DataTypes.STRING,
    dateborrow: DataTypes.DATE,
    expectedreturndate: DataTypes.DATE,
    returnstatus: DataTypes.BOOLEAN,
    approvedreturn: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrowedbooks;
};