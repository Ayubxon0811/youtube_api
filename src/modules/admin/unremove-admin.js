const Admin = require("./Admin");

const { NotFoundError } = require("../../shared/errors");

const unremoveAdmin = async ({ params }) => {
  const existing = await Admin.findOne({ _id: params.id, is_deleted: true });

  if (!existing) {
    throw new NotFoundError("Removed admin Not Found!");
  }

  const unremovedAdmin = await Admin.findByIdAndUpdate(
    { _id: params.id },
    { is_deleted: false },
    { new: true }
  );

  return unremovedAdmin;
};
module.exports = unremoveAdmin;