const { ForbiddenError } = require("../../shared/errors");
const Author = require("./Author");

const UnDelteAuthor = async ({ params }) => {
  let undelete_author = await Author.findOne({
    _id: params.id,
    is_deleted: true,
  });
  if (!undelete_author) {
    throw new ForbiddenError("user already un deleted");
  }
  undelete_author = await Author.findOneAndUpdate(
    { _id: params.id },
    { is_deleted: false },
    { new: true }
  );
  return undelete_author;
};
module.exports = UnDelteAuthor;
