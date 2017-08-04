import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const usersModel = sequelize.define('users', {
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
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: (users) => {
        const hashP = bcrypt.hashSync(users.password, 10);
        users.password = hashP;
        return users;
      },
    }
  });
  return usersModel;
};

export default user;
