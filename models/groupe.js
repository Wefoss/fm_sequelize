'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groupe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Groupe.belongsToMany(models.User, {
      through: 'users_to_groupes',
      foreignKey: 'gropeId'
     })
    }
  }
  Groupe.init({
    name: {type:DataTypes.STRING,allowNull: false,},
    imagePath: {type:DataTypes.STRING},
    description: {type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Groupe',
    tableName: 'groupes',
    underscored: true
  });
  return Groupe;
};