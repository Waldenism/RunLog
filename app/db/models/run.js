
module.exports = function(sequelize, DataTypes) {
  let Run = sequelize.define("Run", {

    run_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    // All distances are kilometers
    run_distance: {
      type: DataTypes.FLOAT.UNSIGNED,
      defaultValue: 0.00
    },

    creation_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()')
    }
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    tableName: 'runs'
  })
  return Run;
}
