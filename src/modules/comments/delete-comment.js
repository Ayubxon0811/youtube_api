const { BadRequestError } = require("../../shared/errors");
const Videos = require("../videos/Videos.schema");
const Comments = require("./Comments-schema");

const DeleteComment = async ({ params }) => {
  let findComment = await Comments.findById(params.id);
  if (!findComment) {
    throw new BadRequestError("not found comments");
  }
  await findComment.deleteOne();
  return "deleted comments";
};

module.exports = DeleteComment;
