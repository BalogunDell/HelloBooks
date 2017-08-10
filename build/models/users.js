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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'firstname cannot be empty'
        },
        is: {
          args: /(\w)/i,
          msg: 'firstname can only contain strings'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'lastname cannot be empty'
        },
        is: {
          args: /(\w)/i,
          msg: 'lastname can only contain strings'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Field must contain a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        len: {
          args: [6, 30],
          msg: 'Password should be 6 t0 30 characters long'
        }
      }
    },
    membership: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'bronze'
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
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
        var hashP = _bcrypt2.default.hashSync(users.password, _bcrypt2.default.genSaltSync(10));
        users.password = hashP;
        return users;
      },
      beforeUpdate: function beforeUpdate(users) {
        var hashP = _bcrypt2.default.hashSync(users.password, _bcrypt2.default.genSaltSync(10));
        users.password = hashP;
        return users;
      }
    }
  });
  return usersModel;
};

exports.default = user;