
module.exports = function(sequelize, DataTypes) {
  var Run = sequelize.define("Run", {

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

    run_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
  
  Run.associate = function(models) {
    Run.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Run;
}
