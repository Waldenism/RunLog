
module.exports = function(sequelize, DataTypes) {
  let Activity = sequelize.define("Activity", {

    activity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    activity_type: {
      type: DataTypes.STRING,
      defaultValue: 'run',
      allowNull: false
    },
    // All distances are kilometers
    distance: {
      type: DataTypes.FLOAT.UNSIGNED,
      defaultValue: 0.00
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
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'activities'
  })
  return Activity;
}
