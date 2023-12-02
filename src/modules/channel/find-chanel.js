const { NotFoundError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const FindByIdChannel = async ({ params }) => {
  const { id } = params;
  const channel = await Channel.findById(id).populate([
    {
      path: "author",
    },
    {
      path: "channel_vidios",
    },
  ]);
  if (!channel) throw new NotFoundError("Channel not found");
  return channel;
};
module.exports = FindByIdChannel;
