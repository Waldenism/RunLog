
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

    user_alias: {
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


    creation_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
    }

    // Reference to runs
  },
  {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
    tableName: 'users'
  });

  User.associate = function(models) {
    User.hasMany(models.Run, {
      onDelete: "cascade"
    });
  };
  return User;
};
