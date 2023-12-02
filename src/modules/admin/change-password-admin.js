const Admin = require("./Admin");
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../../shared/errors");
const { compareSync, hashSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

const changePasswordAdmin = async ({ body, admin }) => {
  const { current_password, new_password } = body;
  const findAdmin = await Admin.findOne({ _id: admin.id, is_deleted: false });

  if (!findAdmin) {
    throw new NotFoundError("Admin Not Found");
  }

  const is_correct = compareSync(current_password, findAdmin.password);

  if (!is_correct) {
    throw new ForbiddenError("Current Password Incorrect!");
  }

  if (!new_password) {
    throw new BadRequestError("New Password Incorrect!");
  }

  await Admin.findByIdAndUpdate(
    { _id: admin.id },
    { password: hashSync(new_password, 10) }
  );

  return { msg: "Your password was successfull changed!" };
};

module.exports = changePasswordAdmin;
