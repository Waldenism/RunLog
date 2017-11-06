
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {

    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1]
      }
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },

    user_type: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    // Setting up foreign key
    team_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: null,
      allowNull: true
    },

    creation_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
    },

    // object_version: {
    //   type: DataTypes.DATE,
    //   defaultValue: sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
    // }
    // TODO: create references
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    tableName: 'users'
  });
  return User;
};
