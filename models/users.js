const validator  = require("validator")
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.posts, { foreignKey: 'id'});
      // define association here
    }
  }
  users.init({
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull:false,
      validate: {
        notNull:{
          args:true,
          msg: "Please Enter Email"
        },
        isEmail:{
          args: validator.isEmail,
          msg: "Enter Valid Email!"
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fill Fullname Field"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg: "Please Fill Username Field"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg: "Please Fill Password Field"
        }
      }
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: "/img/user.png"
    },
    mail_confirm: {
      type: DataTypes.BOOLEAN,
       defaultValue: false},
    followers: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: JSON.stringify([]),
    },
    following: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: JSON.stringify([]),
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};