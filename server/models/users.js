import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const usersModel = sequelize.define('users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname cannot be empty'
        },
        is: {
          args: /(\D+)/,
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
          args: /(\w)/i,
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
      unique: true,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 30],
          msg: 'Password should be 6 to 30 characters long'
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
      associate(model) {
        // associations can be defined here
        usersModel.belongTo(model.borrowedbooks, {
          foreignKey: 'userid',
          as: 'users'
        });
      }
    },
    hooks: {
      beforeCreate: (users) => {
        const hashP = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10));
        users.password = hashP;
        return users;
      },
      beforeUpdate: (users) => {
        const hashP = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10));
        users.password = hashP;
        return users;
      }
    }
  });
  return usersModel;
};

export default user;
