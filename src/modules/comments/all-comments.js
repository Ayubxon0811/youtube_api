const Comments = require("./Comments-schema");
const { NotFoundError } = require("../../shared/errors");
const AllComments = async () => {
  let comment = await Comments.find({});
  if (!comment) {
    throw new NotFoundError("not found comments");
  }
  return comment;
};

module.exports = AllComments;
