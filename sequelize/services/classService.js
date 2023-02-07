const Class = require('../models/Class');

async function addClass(data) {
  const ins = await Class.create(data);
  return ins.toJSON(); // 返回平面对象
}

async function removeClass(id) {
  // 方式1：
  // const ins = await Class.findByPk(id);
  // ins.destroy();

  // 方式2：
  const result = await Class.destroy({
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

async function updateClass(id, data) {
  // 方式1：
  // const ins = await Class.findByPk(id);
  // const result = await ins.update(data); //返回修改后的数据对象

  // 方式2：
  const result = await Class.update(data, {
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

module.exports = {
  addClass,
  removeClass,
  updateClass,
};