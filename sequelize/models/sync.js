// 同步所有模型
const sequelize = require('./db');
require('./Admin');
require('./Student');
require('./Book');
require('./Class');
require('./relation');

(async () => {
  await sequelize.sync({ force: true });
  console.log('所有模型均已成功同步.');
})();
