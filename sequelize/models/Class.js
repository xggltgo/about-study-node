const { DataTypes } = require('sequelize');
const Student = require('./Student');
const sequelize = require('./db');

// 模型定义
const Class = sequelize.define(
  'Class',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createClassTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    // 这是其他模型参数
    createdAt: false, // 禁用默认的 createdAt 字段
    updatedAt: false,
    paranoid: true, // 开启 deleteAt 字段 （用于记录该条数据被删除的时间）
  }
);

module.exports = Class;
