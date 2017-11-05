
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  User.sync({force:true})

  return User;
};