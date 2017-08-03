const user = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
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
    }
  });
  return users;
};

export default user;
