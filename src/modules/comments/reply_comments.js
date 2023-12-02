const { NotFoundError } = require("../../shared/errors");
let Comments = require("../comments/Comments-schema");
const Videos = require("../videos/Videos.schema");

async function replyComments({ body, params, user }) {
  let findVideo = await Videos.findById({ _id: body.id });
  if (!findVideo) {
    throw new NotFoundError("not found video");
  }
  let findComment = await Comments.findOne({ _id: params.id });
  if (!findComment) {
    throw new NotFoundError("not found comment");
  }
  let create_comments = await Comments.create({
    author: user.id,
    comment_videos: findVideo._id,
    ...body,
  });
  findComment.stats.reply_comments.push(create_comments._id);
  await findComment.save();
  return findComment;
}

module.exports = replyComments;
