const md5 = require('md5');
const Admin = require('../models/Admin');

async function addAdmin(data) {
  data.loginPwd = md5(data.loginPwd);
  const ins = await Admin.create(data);
  return ins.toJSON(); // 返回平面对象
}

async function removeAdmin(id) {
  // 方式1：
  // const ins = await Admin.findByPk(id);
  // ins.destroy();

  // 方式2：
  const result = await Admin.destroy({
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

async function updateAdmin(id, data) {
  // 方式1：
  // const ins = await Admin.findByPk(id);
  // const result = await ins.update(data); //返回修改后的数据对象

  // 方式2：
  data.loginPwd = md5(data.loginPwd);
  const result = await Admin.update(data, {
    where: {
      id,
    },
  });
  return result; // 返回影响的行数
}

// 登录
async function login(loginId, loginPwd) {
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd: md5(loginPwd),
    },
    attributes: ['id', 'loginId', 'deletedAt'],
  });
  if (result && result.loginId === loginId) {
    // 通过JS 区分是否满足大小写
    return result.toJSON();
  }
  return null;
}

// 查询单个管理员
async function getAdminById(id) {
  const result = await Admin.findByPk(id);
  if (result) {
    return result.toJSON();
  }
  return null;
}

// 查询所有管理员
async function getAllAdmins() {
  const result = await Admin.findAll();
  return JSON.parse(JSON.stringify(result));
}

module.exports = {
  addAdmin,
  removeAdmin,
  updateAdmin,
  login,
  getAdminById,
  getAllAdmins,
};
