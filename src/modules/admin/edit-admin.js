const Admin = require("./Admin");

const { NotFoundError, BadRequestError } = require("../../shared/errors");

const editAdmin = async ({ params, body }) => {
  const existing = await Admin.findOne({ _id: params.id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Admin Not Found!");
  }

  const existedUsername = await Admin.findOne({ username: body.username });

  if (existedUsername) {
    throw new BadRequestError("This username already existed!");
  }

  const editedAdminObj = {
    first_name: body.first_name ? body.first_name : existing.first_name,
    last_name: body.last_name ? body.last_name : existing.last_name,
    username: body.username ? body.username : existing.username,
    image: body.image ? body.image : existing.image,
  };

  const editedAdmin = await Admin.findByIdAndUpdate(
    { _id: params.id },
    editedAdminObj,
    {
      new: true,
    },
  );

  return editedAdmin;
};
module.exports = editAdmin;
