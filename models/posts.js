'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init({
    user: DataTypes.INTEGER,
    username: DataTypes.STRING,
    profile_photo: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    likes: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([])
    }
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};