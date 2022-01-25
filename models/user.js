"use strict";
const { Model } = require("sequelize");
const { isBefore } = require("date-fns");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        field: "first_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      lastName: {
        type: DataTypes.STRING(128),
        field: "last_name",
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        } 
      },
      password: {
        type: DataTypes.TEXT,
        field: "password_hash",
        allowNull: false,
        set(value) {
           this.setDataValue('password', 'hashpassword')
        }
      },
      birthday: { type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isValidDate(value) {
          if(isBefore(new Date(), new Date(value))) {
           throw new Error('check DateBirthday')
           }
          }
        } 
      },
      isMale: { 
        type: DataTypes.BOOLEAN, 
        field: "is_male" },
    },
    {
      sequelize,
      modelName: "User",
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
