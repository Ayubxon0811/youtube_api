const { BadRequestError, NotFoundError } = require("../../shared/errors");
const Channel = require("../channel/channel.schema");
const Videos = require("./Videos.schema");
const path = require("path");
const VideoCreate = async ({ body, file, files, user, params }) => {
  const { title, ...data } = body;
  let find_chanel = await Channel.findById(params.id);
  if (!find_chanel) {
    throw new NotFoundError("not found chanel");
  }
  const find_id_video = await Videos.findOne({ title });
  if (find_id_video) {
    throw new BadRequestError("Video already exists");
  }
  let video_path = `/uploads/${files.video[0].filename}`;
  let video_image_path = `/uploads/${files.video_image[0].filename}`;
  let create_video = await Videos.create({
    author: user.id,
    title,
    video_channel: params.id,
    video_image: video_image_path,
    video_path,
    ...data,
  });
  find_chanel.channel_vidios.push(create_video._id);
  await find_chanel.save();
  return create_video;
};

module.exports = VideoCreate;
