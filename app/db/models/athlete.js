module.exports = function(sequelize, DataTypes) {
  let Athlete = sequelize.define("athlete", {
    
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    age: {
      type: DataTypes.TINYINT,
      allowNull: true
    },

    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
    
  });

  return Athlete;

};