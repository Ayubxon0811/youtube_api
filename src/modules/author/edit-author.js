const { hashSync } = require("bcryptjs");
const Author = require("./Author");
const { ForbiddenError } = require("../../shared/errors");

const UpdateAuthors = async ({ params, body }) => {
  let { password, email } = body;
  let exsisted = await Author.findOne({ _id: params.id });
  if (!exsisted) {
    return {
      status: 404,
      message: "Author not found in the database",
    };
  }
  let hasPassword = hashSync(password, 10);
  let hasemail = await Author.findOne({ email });
  if (hasemail) {
    throw new ForbiddenError("email already in use");
  }
  let updated = await Author.findByIdAndUpdate(
    { _id: params.id },
    { password: hasPassword, ...body }
  );
  return updated;
};
module.exports = UpdateAuthors;
