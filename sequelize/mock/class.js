const Mock = require('mockjs');
const { classList } = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'classList|24': [
    {
      'id|+1': 1,
      name: '前端 @id 班',
      createClassTime: '@date',
    },
  ],
});

// 批量添加数据到数据库
const Class = require('../models/Class');
Class.bulkCreate(classList);
