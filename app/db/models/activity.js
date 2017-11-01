module.exports = function(sequelize, DataTypes) {
  let Activity = sequelize.define("Activity", {
    
    activity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    athlete_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    activity_type: {
      type: DataTypes.STRING(64),
      defaultValue: 'run',
      allowNull: false,
      validate: {
        len: [1]
      }
    }
    
  },

  {
    underscored: true
  });
  return Activity;

};