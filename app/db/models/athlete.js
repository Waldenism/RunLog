module.exports = function(sequelize, DataTypes) {
  let Athlete = sequelize.define("athlete", {
    
    athlete_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    },

    age: {
      type: DataTypes.TINYINT,
      allowNull: true
    },

    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
    
  },

  {
    underscored: true
  });

  Athlete.sync()

  return Athlete;

};