const { NotFoundError } = require("../../shared/errors");
const Videos = require("./Videos.schema");

const DeleteVideo = async ({ params }) => {
  let exists = await Videos.findOne({ _id: params.id, is_deleted: false });
  if (!exists) {
    throw new NotFoundError("not found video");
  }
  let deleteVideo = await Videos.findByIdAndUpdate(
    params.id,
    {
      is_deleted: true,
    },
    { new: true }
  );
  return deleteVideo;
};
module.exports = DeleteVideo;
