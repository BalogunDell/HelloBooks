import bcrypt from 'bcrypt';

const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname cannot be empty'
        },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Firstname can only contain strings'
        },
        len: {
          args: [3, 100],
          msg: 'Firstname should be longer than two characters'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Lastname cannot be empty'
        },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Lastname can only contain strings'
        },
        len: {
          args: [3, 100],
          msg: 'Lastname should be longer than two characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A user with this email exists' },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'Field must contain a valid email address'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username taken, use another'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        },
        is: {
          args: /(\D+)(\d+)/gi,
          msg: 'Username must start with letter(s) and end with digit(s)'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5, 1000],
          msg: 'Password should not be less than 5 characters'
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
    },
    passurl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate(model) {
        // associations can be defined here
        userModel.hasMany(model.borrowedbook, {
          foreignKey: 'userid',
          onDelete: 'CASCADE'
        });
      }
    },
    hooks: {
      beforeCreate: (user) => {
        const hashP = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = hashP;
        return user;
      }
    }
  });
  return userModel;
};

export default User;
