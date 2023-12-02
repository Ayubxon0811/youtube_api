const Admin = require("./Admin");

const listAdmin = async () => {
  const admins_list = await Admin.find({ is_deleted: false });

  return admins_list;
};
module.exports = listAdmin;
