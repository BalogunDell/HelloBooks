'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = function user(sequelize, DataTypes) {
  var usersModel = sequelize.define('users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Bronze'
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(model) {
        // associations can be defined here
        usersModel.belongTo(model.borrowedbooks, {
          foreignKey: 'userid',
          as: 'users'
        });
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(users) {
        var hashP = _bcrypt2.default.hashSync(users.password, 10);
        users.password = hashP;
        return users;
      },
      beforeUpdate: function beforeUpdate(users) {
        var hashP = _bcrypt2.default.hashSync(users.password, 10);
        users.password = hashP;
        return users;
      }
    }
  });
  return usersModel;
};

exports.default = user;