import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
          msg: 'Firstname can only contain alphabets'
        },
        len: {
          args: [2, 100],
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
          msg: 'Lastname can only contain alphabets'
        },
        len: {
          args: [2, 100],
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
        len: {
          args: [1, 100],
          msg: 'Username should be longer than two characters'
        },
        is: {
          args: /(\D)+/,
          msg: 'Username cannot be numbers'
        },
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
          msg: 'Please provide a password with atleast 5 characters.'
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordReseturl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate(model) {
        User.hasMany(model.BorrowedBook, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    },
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = bcrypt.hashSync(user.password,
          bcrypt.genSaltSync(10));
        user.password = hashedPassword;
        return user;
      }
    }
  });
  return User;
};
