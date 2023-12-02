const { NotFoundError } = require("../../shared/errors");
const Videos = require("./Videos.schema");

const EditVideo = async ({ params, body }) => {
  let exists = await Videos.findById(params.id);
  if (!exists) {
    throw new NotFoundError("video not found");
  }
  let edit_videos = await Videos.findByIdAndUpdate({ ...body });
  return edit_videos;
};

module.exports = EditVideo;
