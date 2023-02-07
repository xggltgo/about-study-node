require('../models/relation');
const Mock = require('mockjs');
const { studentList } = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'studentList|300-700': [
    {
      name: '@cname',
      birthday: '@date',
      'sex|1-2': true,
      phone: /1\d{10}/,
      'ClassId|1-24': 1,
    },
  ],
});
// 批量添加数据到数据库
const Student = require('../models/Student');
Student.bulkCreate(studentList);
