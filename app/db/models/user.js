module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    user_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isEmail: true
      }
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },

    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'athlete'
    },

    first_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    last_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    
  },

  {
    underscored: true
  });
  return User
};