const { ObjectId } = require("mongoose").SchemaTypes;
const { NotFoundError } = require("../../shared/errors");
const Videos = require("../videos/Videos.schema");
const Comments = require("./Comments-schema");

const AddComment = async ({ params, body, user }) => {
  let findVideo = await Videos.findById({ _id: params.id });
  if (!findVideo) {
    throw new NotFoundError("not found video");
  }
  let create_video = await Comments.create({
    author: user.id,
    comment_videos: findVideo._id,
    ...body,
  });
  findVideo.video_comments.push(create_video._id);
  await findVideo.save();
  return create_video;
};
module.exports = AddComment;
