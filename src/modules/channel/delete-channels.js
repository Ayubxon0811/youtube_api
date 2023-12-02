const { NotFoundError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const delete_chanel = async ({ params }) => {
  let exsited = await Channel.findById(params.id);
  if (!exsited) {
    throw new NotFoundError("channel not found");
  }
  let delete_channels = await Channel.findByIdAndUpdate(
    params.id,
    {
      is_deleted: true,
    },
    { new: true }
  );
  return delete_channels;
};

module.exports = delete_chanel;
