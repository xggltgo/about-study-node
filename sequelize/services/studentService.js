const Student = require('../models/Student');
const Class = require('../models/Class');
const { Op } = require('sequelize');

async function addStudent(data) {
  const ins = await Student.create(data);
  return ins.toJSON(); // 返回平面对象
}

async function removeStudent(id) {
  // 方式1：
  // const ins = await Student.findByPk(id);
  // ins.destroy();

  // 方式2：
  const result = await Student.destroy({
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

async function updateStudent(id, data) {
  // 方式1：
  // const ins = await Student.findByPk(id);
  // const result = await ins.update(data); //返回修改后的数据对象

  // 方式2：
  const result = await Student.update(data, {
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

async function getStudentListByPage(page = 1, limit = 10, sex = -1, name) {
  // 方式1
  // const result = await Student.findAll({
  //   offset: (page - 1) * limit,
  //   limit,
  // });
  // const total = await Student.count();
  // return {
  //   total,
  //   data: JSON.parse(JSON.stringify(result)),
  // };
  let where = {};
  if (sex !== -1) {
    where.sex = !!sex;
  }
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`, // 使用 Op 操作符进行模糊查询
    };
  }

  // 方式2
  const result = await Student.findAndCountAll({
    where,
    attributes: ['id', 'name', 'sex', 'phone'], // 控制需要查询的字段
    offset: (page - 1) * limit, // 跳过多少条数据
    limit, // 页容量
    include: [Class], // 配置此属性会自动联表查询
  });

  return {
    total: result.count,
    data: JSON.parse(JSON.stringify(result.rows)),
  };
}

module.exports = {
  addStudent,
  removeStudent,
  updateStudent,
  getStudentListByPage,
};
