const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// 模型定义
const Book = sequelize.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 这是其他模型参数
    paranoid: true, // 开启 deleteAt 字段 （用于记录该条数据被删除的时间）
  }
);

module.exports = Book;
