// require('./models/sync');
require('./models/relation');

const adminService = require('./services/adminService');

adminService.login('xgglt', '1218').then((res) => {
  console.log(res);
});
