const Admin = require("./Admin");

const { NotFoundError } = require("../../shared/errors");

const removeAdmin = async ({ params }) => {
  const existing = await Admin.findOne({ _id: params.id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Admin Not Found!");
  }

  const removedAdmin = await Admin.findByIdAndUpdate(
    { _id: params.id },
    { is_deleted: true },
    { new: true },
  );

  return removedAdmin;
};
module.exports = removeAdmin;
