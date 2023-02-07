const Book = require('../models/Book');

async function addBook(data) {
  const ins = await Book.create(data);
  return ins.toJSON(); // 返回平面对象
}

async function removeBook(id) {
  // 方式1：
  // const ins = await Book.findByPk(id);
  // ins.destroy();

  // 方式2：
  const result = await Book.destroy({
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

async function updateBook(id, data) {
  // 方式1：
  // const ins = await Book.findByPk(id);
  // const result = await ins.update(data); //返回修改后的数据对象

  // 方式2：
  const result = await Book.update(data, {
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

module.exports = {
  addBook,
  removeBook,
  updateBook,
};
