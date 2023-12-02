let Comments = require("./Comments-schema");
const { BadRequestError } = require("../../shared/errors");
const Videos = require("../videos/Videos.schema");

const findComment = async ({ params }) => {
  let findcomment = await Videos.findById(params.id).populate([
    {
      path: "video_comments",
      populate: "author",
    },
  ]);
  if (!findcomment) {
    throw new BadRequestError("not found comment");
  }
  return findcomment;
};
module.exports = findComment;
